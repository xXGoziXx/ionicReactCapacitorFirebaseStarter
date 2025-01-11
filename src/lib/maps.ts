import { Loader } from '@googlemaps/js-api-loader';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import {
    OpeningHours,
    Location,
    Coordinates,
    DistanceFilterEnum
} from '../models/Location';
import * as geofire from 'geofire-common';
import { PostTypeEnum } from '../models/Post';
import {
    DEFAULT_DISTANCE,
    FIELDS,
    POSTBOT_LOCATION,
    POSTBOT_VIDEOS
} from '../constants/constants';
import { FilterType } from '../models/Filter';
import restaurantMarker from '../assets/icons/RestaurantMapMarker.svg';
import restaurantMarkerCount from '../assets/icons/RestaurantWithCountMarker.svg';
import {
    AIRestaurantInfo,
    LocationWithPostCount,
    PostBotVideo
} from '../models/Admin';
import { Cluster, MarkerClusterer } from '@googlemaps/markerclusterer';
import { getConvertedDistance } from './utils';
import {
    FirebaseFirestore,
    QueryCompositeFilterConstraint
} from '@capacitor-firebase/firestore';

const language = navigator.language;
const region = language.split('-')[1];
export const mapsLoader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAP_APIKEY || '',
    version: 'beta',
    language,
    region,
    libraries: ['places', 'routes', 'core']
});

/**
 * Finds places from Maps based on the given query and origin.
 *
 * @param query - The query string to search for places (e.g. "restaurants", "activities").
 * @param quantity - The maximum number of places to retrieve (default: 10).
 * @param origin - The origin location for the search (default: "me").
 * @returns A promise that resolves to an array of place details.
 */
export async function findPlacesFromMaps(
    query: string,
    quantity: number = 10,
    origin = 'me'
) {
    const { Place, PlacesService } = await mapsLoader.importLibrary('places');

    let includedType: string;
    if (query === 'restaurants') {
        includedType = 'restaurant';
    } else if (query === 'activities' || query === 'events') {
        includedType = 'point_of_interest';
    } else {
        includedType = '';
    }
    try {
        const request = {
            textQuery: `${query} near ${origin}`, // e.g. 'restaurants near me'
            fields: ['id'],
            ...(includedType.length && { includedType }),
            maxResultCount: quantity > 20 ? 20 : quantity,
            minRating: 3.2,
            useStrictTypeFiltering: false
        };

        // Searches for places based on the request
        const { places } = await Place.searchByText(request);
        const placeIDs = places.map(place => place.id);

        // Gets the details of each place from the placeIDs
        const placeDetails = await Promise.all(
            placeIDs.map(placeID => {
                return new Promise<google.maps.places.PlaceResult | null>(
                    (resolve, reject) => {
                        // maps is needed to create a new PlacesService instance
                        const maps = new google.maps.Map(
                            document.getElementById('map') as HTMLElement
                        );
                        const placesService = new PlacesService(maps);
                        // here we get the details of the place
                        placesService.getDetails(
                            { placeId: placeID, fields: FIELDS },
                            (result, status) => {
                                // if the status is OK, we resolve the promise with the result
                                if (status === 'OK') {
                                    resolve(result);
                                } else {
                                    // if the status is not OK, we reject the promise with the status
                                    reject(status);
                                }
                            }
                        );
                    }
                );
            })
        );

        // console.log("Found places from Maps:", placeDetails);

        if (placeDetails.length) {
            return placeDetails;
        } else {
            console.log('No results');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Fetches a location document from Firestore by its ID
 * @param locationID - The unique identifier of the location document
 * @returns Promise resolving to the Location document or null if not found
 * @throws Error if the locationID is empty or invalid
 */
export const fetchLocationByID = async (
    locationID: string
): Promise<Location | null> => {
    // Input validation
    if (!locationID?.trim()) {
        throw new Error('Location ID is required');
    }

    try {
        // Fetch the location document from Firestore
        const { snapshot: locationSnapshot } =
            await FirebaseFirestore.getDocument<Location>({
                reference: `locations/${locationID}`
            });

        // Return the location data if it exists
        if (locationSnapshot?.data) {
            return locationSnapshot.data;
        }

        console.warn(`Location with ID ${locationID} was not found`);
        return null;
    } catch (error) {
        // Log the error with more context
        console.error(`Error fetching location ${locationID}:`, error);
        throw new Error(
            `Failed to fetch location: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

/**
 * Finds places from Firestore based on the given origin latitude and longitude.
 * Optionally, a quantity parameter can be provided to limit the number of results.
 * Returns an array of objects containing the Firestore document and the route distance in kilometers.
 *
 * @param originLat - The latitude of the origin location.
 * @param originLng - The longitude of the origin location.
//  * @param quantity - Optional. The maximum number of results to return.
 * @returns A promise that resolves to an array of objects containing the Firestore document and the route distance in kilometers.
 */
export const findPlacesFromFirestore = async (
    originLat: number,
    originLng: number,
    filters: FilterType,
    // quantity: number = 30,
    type: PostTypeEnum = PostTypeEnum.RESTAURANT
): Promise<Location[]> => {
    const labels = filters.labels;
    const distance = filters.distance;
    const foodTypes = filters.foodTypes;
    // console.log(
    //     'Finding places from Firestore...',
    //     originLat,
    //     originLng,
    //     distance,
    //     labels,
    //     foodTypes
    // );
    const center: geofire.Geopoint = [originLat, originLng];

    const radiusInM = (value: DistanceFilterEnum = distance) => {
        // console.log('Distance:', value);
        switch (value) {
            case DistanceFilterEnum.CLOSE_BY:
                return 0.3 * 1000;
            case DistanceFilterEnum.MODERATE:
                return 5 * 1000;
            case DistanceFilterEnum.FURTHER_AWAY:
                return 20 * 1000;
            default:
                return radiusInM(DEFAULT_DISTANCE);
        }
    };

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM());
    // console.log('Query Parameters:', type, radiusInM(), distance);

    const promises = bounds.map(b => {
        // console.log('Getting locations from Firestore...', b);
        const compositeFilter: QueryCompositeFilterConstraint = {
            type: 'and',
            queryConstraints: [
                {
                    type: 'where',
                    fieldPath: 'type',
                    opStr: '==',
                    value: type
                },
                {
                    type: 'where',
                    fieldPath: 'isVerified',
                    opStr: '==',
                    value: true
                },
                {
                    type: 'where',
                    fieldPath: 'geohash',
                    opStr: '>=',
                    value: b[0]
                },
                {
                    type: 'where',
                    fieldPath: 'geohash',
                    opStr: '<=',
                    value: b[1]
                }
            ]
        };
        try {
            return FirebaseFirestore.getCollection<Location>({
                reference: 'locations',
                compositeFilter,
                queryConstraints: [
                    {
                        type: 'orderBy',
                        fieldPath: 'geohash',
                        directionStr: 'asc'
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching locations:', error);
            return null;
        }
    });

    // Collect all the query results together into a single list
    const settledPromises = await Promise.allSettled(promises);

    const locationDocs = settledPromises
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value?.snapshots ?? []);

    // console.log(
    //     'locationDocs',
    //     locationDocs.map(doc => doc.data)
    // );
    const matchingDocs = [];
    for (const doc of locationDocs) {
        if (!doc.data) continue;
        const { lat, lng } = doc.data;

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        // console.log('Distance:', distanceInM, 'radiusInM', radiusInM());
        if (distanceInM <= radiusInM()) {
            matchingDocs.push(doc);
        }
    }

    // console.log(
    //     'matchingDocs',
    //     matchingDocs.map(doc => doc.data)
    // );

    let filteredLocations = matchingDocs;
    if (labels.length > 0 || foodTypes.length > 0) {
        filteredLocations = filteredLocations.filter(doc => {
            if (!doc.data) return false;
            const { foodTypes: filteredFoodTypes, labels: filteredLabels } =
                doc.data;
            const matchesLabels =
                filteredLabels?.length === 0 ||
                filteredLabels?.every(label => filteredLabels.includes(label));
            const matchesFoodTypes =
                filteredFoodTypes.length === 0 ||
                filteredFoodTypes.some(foodType =>
                    filteredFoodTypes.includes(foodType)
                );

            return matchesLabels && matchesFoodTypes;
        });
    }

    return filteredLocations.map(doc => doc.data).filter(doc => doc !== null);
};

/**
 * Calculates the distance between two locations using the Google Maps Distance Matrix API.
 * @param origin - The origin location.
 * @param destination - The destination location.
 * @param callback - Optional callback function to handle the response.
 * @returns A Promise that resolves to the distance matrix response or null.
 */
export const getRouteDistance = async (
    origin: google.maps.LatLng,
    destination: google.maps.LatLng,
    callback?: (
        response: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus
    ) => void
): Promise<google.maps.DirectionsResult> => {
    const { DirectionsService } = await mapsLoader.importLibrary('routes');
    const directionsService = new DirectionsService();
    return directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (
            response: google.maps.DirectionsResult | null,
            status: google.maps.DirectionsStatus
        ) => {
            return callback && callback(response, status);
        }
    );
};

/**
 * Uploads a location to the firestore.
 *
 * @param location - The location object to be uploaded.
 * @param type - The type of the location (e.g., "restaurant", "activity" or "event").
 * @returns The uploaded location object.
 */
export const uploadLocation = async (
    location: Location,
    type: PostTypeEnum
): Promise<Location> => {
    // convert the data into the post structure
    const {
        lat,
        lng,
        address,
        toilets,
        rating,
        reviews,
        phoneNumber,
        website,
        priceLevel,
        openingHours,
        menu,
        labels,
        foodTypes,
        reservation,
        isVerified
    } = location;
    const metadata = {
        toilets,
        rating,
        reviews,
        phoneNumber,
        website,
        priceLevel
    };

    // upload location to the firestore
    const hash = geofire.geohashForLocation([lat, lng]);
    const locationName = location?.name;
    const convertedLocation: Location = {
        ID: '',
        geohash: hash,
        name: locationName,
        searchName: locationName.toLowerCase(),
        openingHours: openingHours ?? ['', '', '', '', '', '', ''],
        createdAt: serverTimestamp() as Timestamp,
        modifiedAt: serverTimestamp() as Timestamp,
        type,
        address,
        lat,
        lng,
        photos: [],
        isVerified: isVerified ?? false,
        menu: menu ?? '',
        reservation: reservation ?? '',
        labels: labels ?? [],
        foodTypes: foodTypes || [],
        ...metadata
    };
    // console.log('Uploading location...', convertedlocation);

    const { reference: convertedLocationDocRef } =
        await FirebaseFirestore.addDocument({
            reference: `locations`,
            data: convertedLocation
        });
    await FirebaseFirestore.updateDocument({
        reference: `locations/${convertedLocationDocRef.id}`,
        data: {
            ID: convertedLocationDocRef.id
        }
    });
    convertedLocation.ID = convertedLocationDocRef.id;

    return convertedLocation;
};

/**
 * Checks and requests location permissions if needed, then gets current location
 * @returns Promise<Coordinates> containing lat/lng of user's location
 * @throws Error if location permissions denied or location unavailable
 */
export const getCurrentLocation = async (): Promise<Coordinates> => {
    try {
        // First check if we're on a native platform (iOS/Android)
        if (Capacitor.isNativePlatform()) {
            // Request location permissions
            const permResult = await Geolocation.requestPermissions({
                permissions: ['location']
            });

            if (permResult.location !== 'granted') {
                throw new Error('Location permission was denied');
            }
        }

        // Try to get high accuracy location first
        try {
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: false,
                timeout: 10000, // 10 second timeout
                maximumAge: 0 // Don't use cached position
            });

            return {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        } catch (highAccuracyError) {
            console.warn(
                'High accuracy location failed, falling back to standard accuracy:',
                highAccuracyError
            );

            // Fall back to standard accuracy
            const position = await Geolocation.getCurrentPosition();
            return {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }
    } catch (error) {
        console.error('Location error:', error);

        if (error instanceof GeolocationPositionError) {
            switch (error.code) {
                case GeolocationPositionError.PERMISSION_DENIED:
                    throw new Error(
                        'Location permission denied. Please enable location services in your device settings.'
                    );
                case GeolocationPositionError.POSITION_UNAVAILABLE:
                    throw new Error(
                        'Location information is currently unavailable. Please try again later.'
                    );
                case GeolocationPositionError.TIMEOUT:
                    throw new Error(
                        'Location request timed out. Please check your connection and try again.'
                    );
                default:
                    throw new Error('An unknown location error occurred.');
            }
        }

        // If we get here, fall back to mock coordinates
        console.warn('Falling back to mock coordinates');
        return await getMockCoordinates(0);
    }
};

/**
 * Converts a Google Places result to a Location object.
 * @param location - The Google Places result.
 * @param type - The type of the location.
 * @returns The converted Location object.
 */
export const convertGooglePlacesResultToLocation = (
    location: google.maps.places.PlaceResult,
    type: PostTypeEnum
): Location => {
    const lat = location?.geometry?.location?.lat() as number;
    const lng = location?.geometry?.location?.lng() as number;
    const address = location?.formatted_address as string;
    const metadata = {
        toilets: location?.types?.includes('toilets'),
        rating: location?.rating ?? 0,
        reviews: [],
        phoneNumber: location?.international_phone_number ?? '',
        website: location?.website ?? '',
        priceLevel: location?.price_level ?? -1
    };
    const openingHours = location?.opening_hours?.weekday_text?.map(
        openingHour => openingHour.split(': ')[1]
    ) as OpeningHours;

    const hash = geofire.geohashForLocation([lat, lng]);
    const locationName = location?.name as string;
    const convertedLocation: Location = {
        ID: '',
        name: locationName,
        searchName: locationName.toLowerCase(),
        openingHours: openingHours || ['', '', '', '', '', '', ''],
        createdAt: serverTimestamp() as Timestamp,
        modifiedAt: serverTimestamp() as Timestamp,
        type,
        address,
        lat,
        lng,
        geohash: hash,
        labels: [],
        foodTypes: [],
        photos: [],
        menu: '',
        reservation: '',
        ...metadata
    };
    return convertedLocation;
};

/**
 * Returns the rating level based on the given rating level value.
 * @param ratingLevel - The rating level value.
 * @returns The corresponding rating level string.
 */
export const getRatingLevel = (ratingLevel: number) => {
    switch (ratingLevel) {
        case 0:
            return '0';
        case 1:
            return '0 - 10';
        case 2:
            return '10 - 100';
        case 3:
            return '100 - 1000';
        case 4:
            return '1000+';
        default:
            return 'Unknown';
    }
};

export const getMockCoordinates = async (index: number) => {
    return await import('../mock/coordinates.json').then(({ coordinates }) => {
        return coordinates[index].coordinates;
    });
};

export const deleteLocation = async (locationID: string) => {
    console.log(`Deleting ${locationID}...`);
    try {
        // Delete the location document
        await FirebaseFirestore.deleteDocument({
            reference: `locations/${locationID}`
        });

        // Query for posts with matching locationID
        const { snapshots: locationPosts } =
            await FirebaseFirestore.getCollection({
                reference: 'posts',
                compositeFilter: {
                    type: 'and',
                    queryConstraints: [
                        {
                            type: 'where',
                            fieldPath: 'locationID',
                            opStr: '==',
                            value: locationID
                        }
                    ]
                }
            });

        // Delete all associated posts
        for (const post of locationPosts) {
            await FirebaseFirestore.deleteDocument({
                reference: `posts/${post.id}`
            });
        }
    } catch (error) {
        console.error('Error deleting location:', error);
    }
};

export const renderMap = async (
    mapElement: HTMLElement,
    center: google.maps.LatLng,
    zoom: number,
    disableDefaultUI: boolean = false
) => {
    const { AdvancedMarkerElement, PinElement } =
        await mapsLoader.importLibrary('marker');
    if (!mapElement) return;
    const map = new google.maps.Map(mapElement, {
        center: center,
        zoom: zoom,
        disableDefaultUI,
        mapId: 'DEMO_MAP_ID'
    });

    const glyph = document.createElement('img');
    glyph.src = restaurantMarker;

    const pin = new PinElement({
        glyph
    });

    return new AdvancedMarkerElement({
        map,
        position: center,
        content: pin.element
    });
};

export const getLocationInfoByAI = async (
    name: string,
    location: string
): Promise<AIRestaurantInfo> => {
    try {
        const params = new URLSearchParams();
        params.append('location', location);
        params.append('name', name);
        params.append('full_address', `${name}, ${location}`);

        const response = await fetch(
            `${POSTBOT_LOCATION}?${params.toString()}`
        );
        const data: AIRestaurantInfo = await response.json();
        return data;
    } catch (error) {
        console.log('Failed to fetch location info by AI:', error);
        return {
            menu: ['', ''],
            reservation: ['', ''],
            foodTypes: [],
            labels: []
        };
    }
};

export const getVideosFromAI = async (
    location: string
): Promise<PostBotVideo[]> => {
    try {
        const params = new URLSearchParams();
        params.append('location', location);

        const response = await fetch(`${POSTBOT_VIDEOS}?${params.toString()}`);
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.log('Failed to fetch videos by AI:', error);
        return [];
    }
};

export const renderContentDensityMap = async (
    mapElement: HTMLElement,
    center: google.maps.LatLng,
    zoom: number,
    locations: LocationWithPostCount[],
    navigationHandler: (path: string) => void,
    disableDefaultUI: boolean = false
) => {
    const map = new google.maps.Map(mapElement, {
        center: center,
        zoom: zoom,
        disableDefaultUI,
        mapId: 'DEMO_MAP_ID'
    });

    const markers = locations.map(({ restaurant, videoCount }) => {
        const position = new google.maps.LatLng(restaurant.lat, restaurant.lng);

        const createdMarker = generateMarker(
            position,
            restaurantMarkerCount,
            videoCount
        );
        createdMarker.addListener('click', () => {
            navigationHandler(`/admin/admin-video-verifier/${restaurant.ID}`);
        });

        return createdMarker;
    });

    return { markers, map };
};

/**
 * Generates a marker with custom icon and optional count
 */
export const generateMarker = (
    position: google.maps.LatLng,
    markerIcon: string,
    count?: number,
    map?: google.maps.Map,
    current: boolean = false
): google.maps.marker.AdvancedMarkerElement => {
    const pinContainer = document.createElement('div');
    const glyph = document.createElement('img');
    pinContainer.classList.add(
        current ? 'current-restaurant' : 'content-density--marker'
    );
    glyph.src = markerIcon;

    pinContainer.appendChild(glyph);

    if (count !== undefined) {
        const countContainer = document.createElement('span');
        countContainer.textContent = `${count}`;
        pinContainer.appendChild(countContainer);
    }

    const marker = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: pinContainer,
        map: map
    });

    return marker;
};

/**
 * Custom MarkerClusterer class extending the Google Maps MarkerClusterer
 */
export class CustomMarkerClusterer extends MarkerClusterer {
    getClusters(): Cluster[] {
        return this.clusters;
    }
}

/**
 * Creates markers for a list of locations
 */
export const createMarkers = (
    locations: LocationWithPostCount[],
    navigationHandler: (path: string) => void
): google.maps.marker.AdvancedMarkerElement[] => {
    return locations.map(({ restaurant, videoCount }) => {
        const position = new google.maps.LatLng(restaurant.lat, restaurant.lng);
        const marker = generateMarker(
            position,
            restaurantMarkerCount,
            videoCount
        );

        marker.addListener('click', () => {
            navigationHandler(`/admin/admin-video-verifier/${restaurant.ID}`);
        });

        return marker;
    });
};

interface updateDistanceProps {
    originLat: number | null | undefined;
    originLng: number | null | undefined;
    destinationLat: number | null | undefined;
    destinationLng: number | null | undefined;
    handleDistance: (distance: string | null) => void;
}
// Update the distance between the current location and the post location
export const updateDistance = async ({
    originLat,
    originLng,
    destinationLat,
    destinationLng,
    handleDistance
}: updateDistanceProps) => {
    try {
        if (!originLat || !originLng || !destinationLat || !destinationLng)
            return;

        const { LatLng } = await mapsLoader.importLibrary('core');

        const origin = new LatLng(originLat, originLng);
        const destination = new LatLng(destinationLat, destinationLng);

        const response = await getRouteDistance(origin, destination);

        if (!response?.routes?.[0]?.legs?.[0]?.distance) {
            throw new Error('Invalid route response');
        }

        const distanceInKm = response.routes[0].legs[0].distance.value / 1000;
        handleDistance(getConvertedDistance(distanceInKm, 'km'));
    } catch (error) {
        console.error('Error calculating distance:', error);
        handleDistance(null);
    }
};
