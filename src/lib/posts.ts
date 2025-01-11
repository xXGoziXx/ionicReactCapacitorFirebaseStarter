import { Location } from './../models/Location';
import {
    GeoPoint,
    Timestamp,
    serverTimestamp,
    DocumentReference,
    increment
} from 'firebase/firestore';
import {
    findPlacesFromMaps,
    uploadLocation,
    convertGooglePlacesResultToLocation
} from '../lib/maps';
import {
    VideoData,
    getPlaceVideoData,
    getTiktokVideoInfo
} from '../lib/videos';
import {
    FirestorePost,
    Post,
    PostTypeEnum,
    Tag
} from '../models/Post';
import { User } from '../models/User';

import { uuidv4 } from '@firebase/util';
import { FirebaseFirestore, WriteBatchOperation } from '@capacitor-firebase/firestore';
import { FirebaseStorage } from '@capacitor-firebase/storage';

interface UploadPostProps {
    locationData: Location;
    videoInfo: { data: VideoData | null; link: string };
    type: PostTypeEnum;
    currentUser?: User;
    tags?: string[];
}

export const uploadPost = async ({
    locationData,
    videoInfo,
    type,
    currentUser,
    tags = []
}: UploadPostProps): Promise<DocumentReference<FirestorePost, FirestorePost> | void> => {
    const {
        ID: hash,
        lat,
        lng,
        address,
        toilets,
        phoneNumber,
        openingHours,
        website,
        priceLevel,
        menu,
        reservation,
        reviews,
        labels,
        rating,
        foodTypes,
        isVerified = false
    } = locationData;

    const convertedPost: Post = {
        ID: ``,
        locationID: hash,
        userID: currentUser ? currentUser.ID : 'generatedbygontrel',
        type,
        locationName: locationData?.name || '',
        location: new GeoPoint(lat, lng),
        src: {
            thumbURL: videoInfo?.data?.cover ?? '',
            videoURL: videoInfo?.data?.play ?? ''
        },
        views: 0,
        username: currentUser ? currentUser.username : 'gontrel',
        userProfileImage: currentUser ? currentUser.profileImage : '',
        userDisplayName: currentUser ? currentUser.displayName : 'Gontrel',
        openingHours: openingHours || ['', '', '', '', '', '', ''],
        address,
        metadata: {
            toilets: toilets,
            rating: rating ?? 0,
            reviews: reviews ?? [],
            phoneNumber: phoneNumber ?? '',
            website: website ?? '',
            priceLevel: priceLevel ?? -1,
            menu: menu ?? '',
            reservation: reservation ?? '',
            labels: labels ?? [],
            foodTypes: foodTypes ?? []
        },
        tags,
        createdAt: serverTimestamp() as Timestamp,
        modifiedAt: serverTimestamp() as Timestamp,
        tiktokLink: videoInfo.link,
        isVerified
    };

    const batchOperations: WriteBatchOperation[] = [];

    console.log('Posting:', convertedPost);
    if (!convertedPost.src.videoURL) return;
        // upload the post to the firestore
    const ref = await FirebaseFirestore.addDocument({
        reference: "posts",
        data: convertedPost
    });
    const ID = ref.reference.id;

    // update the post ID
    await FirebaseFirestore.updateDocument({
        reference: `posts/${ID}`,
        data: { ID }
    });

    const postRef: DocumentReference<FirestorePost, FirestorePost> = ref.reference as DocumentReference<FirestorePost, FirestorePost>;

    // Increment the count for each tag after the post is successfully uploaded
    const incrementPromises = tags.map(async tag => {
        const normalizedTag = tag.toLowerCase();

        const { snapshots: tagQuerySnapshots } = await FirebaseFirestore.getCollection<Tag>({
            reference: "tags",
            compositeFilter: {
                type: "and",
                queryConstraints: [
                    {
                        type: "where",
                        fieldPath: "name",
                        opStr: "==",
                        value: normalizedTag
                    }
                ]
            }
        });

        if (tagQuerySnapshots.length > 0) {
            // Tag exists, increment its count
            const tagDoc = tagQuerySnapshots[0].data;
            if (tagDoc) {
            batchOperations.push({
                    type: "update",
                    reference: `tags/${tagDoc?.ID}`,
                    data: { count: increment(1) }
                });
            } else {
                console.error(`Tag ${normalizedTag} does not exist.`);
            }
        } else {
            console.error(`Tag ${normalizedTag} does not exist.`);
        }
    });

    // Wait for all the tags to be processed
    await Promise.all(incrementPromises);

    // Commit the batch operation
    await FirebaseFirestore.writeBatch({
        operations: batchOperations
    });

    return postRef;
};

export const generateLocationAndVideoData = async (
    type: PostTypeEnum,
    quantity: number = 5,
    origin = 'me'
): Promise<void> => {
    let query: string;
    // set the query based on the type
    if (type === 'restaurant') {
        query = 'restaurants';
    } else if (type === 'activity') {
        query = 'activities';
    } else if (type === 'event') {
        query = 'events';
    } else {
        query = 'places';
    }

    console.log('Generating posts...');

    // get the restaurant maps data and filter out the undefined values
    const placeData = await findPlacesFromMaps(query, quantity, origin);
    // filter out the undefined values
    const locationData = placeData?.filter(place => place?.name);
    for (const location of locationData) {
        // console.log(location);
        if (location) {
            await uploadLocation(
                convertGooglePlacesResultToLocation(location, type),
                type
            );
        }
    }
    const locations = locationData
        ?.map(
            location =>
                location && convertGooglePlacesResultToLocation(location, type)
        )
        .filter((location): location is Location => !!location);
    await generateVideoData(locations, type);
};

export const generateVideoData = async (
    locationData: Location[],
    type: PostTypeEnum
): Promise<void> => {
    // get the place names
    const placeNames = locationData?.map(place => place?.name);
    // console.log("Generate Post Data Place Names:", placeNames);

    let videoData:
        | ({
            data: VideoData | null;
            link: string;
        } | null)[]
        | null = null;

    if (locationData?.length && placeNames?.length) {
        // get the tiktok video data
        console.log('Generating video data...');
        videoData = await getPlaceVideoData(placeNames, type);
    } else {
        console.log('No places');
    }

    if (
        locationData &&
        videoData &&
        locationData?.length === videoData?.length
    ) {
        console.log('Uploading generated posts...');
        // upload the posts
        for (let i = 0; i < locationData.length; i++) {
            const location = locationData[i];
            const video = videoData[i];
            if (location !== null && video !== null) {
                await uploadPost({
                    locationData: location,
                    videoInfo: video,
                    type,
                    currentUser: undefined
                });
            }
        }
    } else {
        console.log('No data could be generated');
    }
};

interface ConvertFirestorePostToPostParams {
    postDocsData: (FirestorePost | null)[];
    locationData?: Location[];
    postCallback?: (post: Post) => void;
}

export const convertFirestorePostToPost = async ({
    postDocsData,
    postCallback,
    locationData = []
}: ConvertFirestorePostToPostParams): Promise<Post[]> => {
    const locationMap = new Map<string, Location | undefined>();
    const userMap = new Map<string, User | undefined>();
    if (locationData.length > 0) {
        locationData.forEach(location => {
            locationMap.set(location.ID, location);
        });
    }

    return (
        await Promise.all(
            postDocsData.map(async postData => {
                try {
                    if (!postData) return;
                    if (!userMap.has(postData.userID)) {
                        const { snapshot: userDoc } = await FirebaseFirestore.getDocument<User>({
                            reference: `Users/${postData.userID}`
                        });
                        userMap.set(postData.userID, userDoc?.data ?? undefined);
                    }
                    // get the user data
                    const userData = userMap.get(postData.userID);
                    if (!locationMap.has(postData.locationID)) {
                        // get the location data
                        const { snapshot: locationDoc } = await FirebaseFirestore.getDocument<Location>({
                            reference: `locations/${postData.locationID}`
                        });
                        locationMap.set(
                            postData.locationID,
                            locationDoc?.data ?? undefined
                        );
                    }
                    const locationInfo = locationMap.get(postData.locationID);
                    const lat = locationInfo?.lat ?? 0;
                    const lng = locationInfo?.lng ?? 0;
                    const post: Post = {
                        ID: postData.ID,
                        userID: postData.userID,
                        locationID: postData.locationID,
                        type: locationInfo?.type ?? PostTypeEnum.RESTAURANT,
                        locationName: locationInfo?.name ?? "",
                        location: new GeoPoint(lat, lng),
                        address: locationInfo?.address ?? "",
                        src: postData.src,
                        views: postData.views,
                        username: userData?.username ?? "",
                        userProfileImage: userData?.profileImage ?? "",
                        userDisplayName: userData?.displayName ?? "",
                        openingHours: locationInfo?.openingHours ?? [
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null
                        ],
                        createdAt: postData.createdAt,
                        modifiedAt: postData.modifiedAt,
                        metadata: {
                            toilets: locationInfo?.toilets,
                            rating: locationInfo?.rating,
                            reviews: locationInfo?.reviews,
                            phoneNumber: locationInfo?.phoneNumber,
                            website: locationInfo?.website,
                            priceLevel: locationInfo?.priceLevel,
                            menu: locationInfo?.menu,
                            reservation: locationInfo?.reservation,
                            labels: locationInfo?.labels
                        },
                        tags: postData.tags ?? [],
                        tiktokLink: postData.tiktokLink,
                        isVerified: postData.isVerified
                    };

                    const videoStorageRef = `tiktokVideos/${post.ID}.mp4`;
                    const thumbnailStorageRef = `tiktokThumbs/${post.ID}.jpg`;

                    const { downloadUrl: thumbURL } = await FirebaseStorage.getDownloadUrl({
                        path: thumbnailStorageRef
                    });
                    post.src.thumbURL = thumbURL;
                    const { downloadUrl: videoURL } = await FirebaseStorage.getDownloadUrl({
                        path: videoStorageRef
                    });
                    post.src.videoURL = videoURL;
                    // console.log("Post Data:", post);
                    postCallback && postCallback(post);
                    return post;
                } catch (error) {
                    console.log(
                        "There has been an error with converting this post, no location ID found",
                        postData
                    );
                }
            })
        )
    ).filter(post => post !== undefined);
};
/**
 * Deletes a post from Firestore by its ID
 * @param postID - The ID of the post to delete
 */
export const deletePost = async (postID: string): Promise<void> => {
    try {
        await FirebaseFirestore.deleteDocument({
            reference: `posts/${postID}`
        });
    } catch (err) {
        console.error("Error deleting post:", err);
        throw err;
    }
};

export const updateTagsForPost = async (postID: string, newTags: string[]) => {
    // Convert new tags to lowercase
    const normalizedNewTags = newTags.map(tag => tag.toLowerCase());

    // Fetch the current tags from the post
    const { snapshot: postDoc } = await FirebaseFirestore.getDocument<FirestorePost>({
        reference: `posts/${postID}`
    });
    const postData = postDoc?.data;
    const currentTagIDs: string[] = postData?.tags || [];

    // Fetch the current tag names for the currentTagIDs
    const currentTagDocs = await Promise.all(
        currentTagIDs.map(async id => {
            const { snapshot: tagDoc } = await FirebaseFirestore.getDocument<Tag>({
                reference: `tags/${id}`
            });
            return tagDoc?.data;
        })
    );
    const currentTagNames = currentTagDocs
        .map(doc => doc?.name)
        .filter(name => name !== undefined);

    // Find tags to remove (those in current tags but not in new tags)
    const tagsToRemove = currentTagNames.filter(
        tag => !normalizedNewTags.includes(tag)
    );

    // Find tags to add (those in new tags but not in current tags)
    const tagsToAdd = normalizedNewTags.filter(
        tag => !currentTagNames.includes(tag)
    );

    const batchOperations: WriteBatchOperation[] = [];

    // Handle removal of tags
    const removePromises = tagsToRemove.map(async tag => {
        const { snapshots } = await FirebaseFirestore.getCollection({
            reference: "tags",
            compositeFilter: {
                type: "and",
                queryConstraints: [
                    {
                        type: "where",
                        fieldPath: "name",
                        opStr: "==",
                        value: tag
                    }
                ]
            }
        });

        if (snapshots.length > 0) {
            const tagDoc = snapshots[0];
            batchOperations.push({
                type: "update",
                reference: `tags/${tagDoc.id}`,
                data: {
                    count: increment(-1),
                    modifiedAt: serverTimestamp()
                }
            });
            return tagDoc.id;
        }
    });

    // Handle addition of new tags
    const addPromises = tagsToAdd.map(async tag => {
        const { snapshots } = await FirebaseFirestore.getCollection({
            reference: "tags",
            compositeFilter: {
                type: "and",
                queryConstraints: [
                    {
                        type: "where",
                        fieldPath: "name",
                        opStr: "==",
                        value: tag
                    }
                ]
            }
        });

        if (snapshots.length > 0) {
            // Tag exists, increment its count
            const tagDoc = snapshots[0];
            batchOperations.push({
                type: "update",
                reference: `tags/${tagDoc.id}`,
                data: {
                    count: increment(1),
                    modifiedAt: serverTimestamp() as Timestamp
                }
            });
            return tagDoc.id;
        } else {
            // Tag does not exist, create it
            const newTagID = uuidv4();
            batchOperations.push({
                type: "set",
                reference: `tags/${newTagID}`,
                data: {
                    name: tag,
                    count: 1,
                    ID: newTagID,
                    createdAt: serverTimestamp() as Timestamp,
                    modifiedAt: serverTimestamp() as Timestamp
                }
            });
            return newTagID;
        }
    });

    // Wait for all the tags to be processed
    const newTagIDs = await Promise.all(addPromises);
    const removedTagIDs = await Promise.all(removePromises);

    // Combine current tag IDs with new tag IDs ensuring no duplicates
    const newCurrentTagIds = currentTagIDs.filter(
        tag => !removedTagIDs.includes(tag)
    );

    const finalTagsIDs = [...newCurrentTagIds, ...newTagIDs];

    // Add post update to batch operations
    batchOperations.push({
        type: "update",
        reference: `posts/${postID}`,
        data: {
            tags: finalTagsIDs,
            modifiedAt: serverTimestamp() as Timestamp
        }
    });

    // Commit the batch operation
    await FirebaseFirestore.writeBatch({
        operations: batchOperations
    });

    return finalTagsIDs;
};

export const fetchTagsByID = async (tags: string[]): Promise<Tag[]> => {
    const { snapshots } = await FirebaseFirestore.getCollection<Tag>({
        reference: "tags",
        compositeFilter: {
            type: "and",
            queryConstraints: [
                {
                    type: "where",
                    fieldPath: "ID",
                    opStr: "in",
                    value: tags
                }
            ]
        }
    });

    return snapshots.map(doc => doc.data).filter(tag => tag !== null);
};

export const searchForTag = async (searchTerm: string): Promise<Tag[]> => {
    const endTerm = searchTerm.replace(/.$/, c =>
        String.fromCharCode(c.charCodeAt(0) + 1)
    );

    const { snapshots } = await FirebaseFirestore.getCollection<Tag>({
        reference: "tags",
        compositeFilter: {
            type: "and",
            queryConstraints: [
                {
                    type: "where",
                    fieldPath: "name",
                    opStr: ">=",
                    value: searchTerm
                },
                {
                    type: "where",
                    fieldPath: "name",
                    opStr: "<",
                    value: endTerm
                },

            ]
        },
        queryConstraints: [
            {
                type: "orderBy",
                fieldPath: "name",
                directionStr: "asc"
            },
            {
                type: "limit",
                limit: 5
            }
        ]
    });

    return snapshots.map(doc => doc.data).filter(tag => tag !== null);
};

export const createTags = async (tags: string[]): Promise<string[]> => {
    if (tags.length === 0) return [];

    // Convert tags to lowercase for consistency
    const normalizedTags = tags.map(tag => tag.toLowerCase());

    // Fetch existing tags
    const { snapshots: existingTagDocs } = await FirebaseFirestore.getCollection<Tag>({
        reference: "tags",
        compositeFilter: {
            type: "and",
            queryConstraints: [
                {
                    type: "where",
                    fieldPath: "name",
                    opStr: "in",
                    value: normalizedTags
                }
            ]
        }
    });

    // Map existing tags to a dictionary
    const existingTags = existingTagDocs.reduce(
        (acc, doc) => {
            if (doc.data) {
                acc[doc.data.name] = doc.data.ID;
            }
            return acc;
        },
        {} as Record<string, string>
    );

    // Create array to store batch operations
    const batchOperations: {
        reference: string;
        data: Tag;
    }[] = [];
    const newTagIDs: string[] = [];

    // Process new tags
    for (const tag of normalizedTags) {
        if (existingTags[tag]) {
            // Tag exists, add its ID
            newTagIDs.push(existingTags[tag]);
        } else {
            // Tag does not exist, create it without incrementing count
            const newTagID = uuidv4();
            batchOperations.push({
                reference: `tags/${newTagID}`,
                data: {
                    name: tag,
                    count: 0,
                    ID: newTagID,
                    createdAt: serverTimestamp() as Timestamp,
                    modifiedAt: serverTimestamp() as Timestamp
                }
            });
            newTagIDs.push(newTagID);
        }
    }

    // Execute batch operations if there are any new tags
    if (batchOperations.length > 0) {
        await FirebaseFirestore.writeBatch({
            operations: batchOperations.map(op => ({
                type: "set",
                ...op
            }))
        });
    }

    return newTagIDs;
};

export const generatePostTemplate = async (
    url: string,
    location: Location,
    tags: string[] = []
): Promise<Post | undefined> => {
    try {
        const updatedURL = await getTiktokVideoInfo(url);

        const post: Post = {
            ID: `generatedbygontrel_${uuidv4()}`,
            userID: 'generatedbygontrel',
            locationID: location.ID,
            type: PostTypeEnum.RESTAURANT,
            locationName: location.name,
            location: new GeoPoint(Number(location.lat), Number(location.lng)),
            address: '',
            src: {
                thumbURL: updatedURL?.origin_cover ?? '',
                videoURL: updatedURL?.play ?? ''
            },
            username: 'gontrel',
            userProfileImage: '',
            userDisplayName: 'Gontrel Generator',
            openingHours: location.openingHours ?? ['', '', '', '', '', '', ''],
            createdAt: location.createdAt,
            modifiedAt: location.modifiedAt,
            views: 0,
            tiktokLink: url,
            isVerified: false,
            tags: tags,
            metadata: {
                toilets: location.toilets,
                rating: location.rating,
                reviews: [],
                phoneNumber: location.phoneNumber,
                website: location.website,
                menu: location.menu,
                reservation: location.reservation,
                foodTypes: location.foodTypes,
                labels: location.labels,
                priceLevel: location.priceLevel
            }
        };

        return post;
    } catch (error) {
        console.log('failed to generate post template', error);
    }
};

export const getExplorePosts = async (
    postIDs: string[],
    postCallback?: (newPost: Post) => void
): Promise<Post[]> => {
    try {
        const chunkSize = 10; // Firestore 'in' query supports up to 10 items
        const chunkedPostIDs = [];
        for (let i = 0; i < postIDs.length; i += chunkSize) {
            chunkedPostIDs.push(
                postIDs.slice(i, Math.min(i + chunkSize, postIDs.length))
            );
        }

        const tasks = chunkedPostIDs.map(async chunk => {
            try {
                const { snapshots } = await FirebaseFirestore.getCollection<FirestorePost>({
                    reference: "posts",
                    compositeFilter: {
                        type: "and",
                        queryConstraints: [
                            {
                                type: "where",
                                fieldPath: "__name__",
                                opStr: "in",
                                value: chunk
                            }
                        ]
                    }
                });

                const postDocsData = snapshots
                    .map(doc => doc.data)
                    .filter(post =>
                        post !== null && post.isVerified === true
                    );

                return await convertFirestorePostToPost({
                    postDocsData,
                    postCallback
                });
            } catch (error) {
                console.error("Error fetching documents for chunk:", error);
                return [];
            }
        });

        const results = await Promise.all(tasks);
        return results.flat().filter((post): post is Post => post !== undefined);

    } catch (error) {
        console.error("There was an error fetching the posts:", error);
        return [];
    }
};

export const updateExploreIndex = async (userID: string, newIndex: number): Promise<void> => {
    await FirebaseFirestore.updateDocument({
        reference: `userExplorePosts/${userID}`,
        data: {
            current_index: newIndex,
            modifiedAt: serverTimestamp() as Timestamp
        }
    });
};

/**
 * Reports a post by creating a new reported post document in Firestore
 * @param postID - The ID of the post being reported
 * @param userID - The ID of the user reporting the post
 * @returns Object indicating success/failure of the report
 */
export const reportPost = async (
    postID: string,
    userID: string | undefined
): Promise<{ success: boolean }> => {
    try {
        if (userID === undefined) {
            return { success: false };
        }


        const { reference: reportID } = await FirebaseFirestore.addDocument({
            reference: `reportedPosts`,
            data: {
                ID: '',
                userID,
                postID,
                createdAt: serverTimestamp() as Timestamp
            }
        });

        await FirebaseFirestore.updateDocument({
            reference: `reportedPosts/${reportID}`,
            data: {
                ID: reportID
            }
        });



        return { success: true };
    } catch (error) {
        console.error("Error reporting post:", error);
        return { success: false };
    }
};
