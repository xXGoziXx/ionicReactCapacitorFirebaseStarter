import { Timestamp } from 'firebase/firestore';
import { PostTypeEnum } from './Post';

export enum LabelEnum {
    CASUAL = 'Casual',
    BRUNCH = 'Brunch',
    FINE_DINING = 'Fine-dining'
}

export enum DistanceFilterEnum {
    CLOSE_BY = 'Close by',
    MODERATE = 'Moderate',
    FURTHER_AWAY = 'Further away'
}

export enum PageTypeEnum {
    BUSINESS = 'business',
    HOME = 'home',
    KEYWORD = 'keyword',
    RESTAURANT = 'restaurant',
    SAVED = 'saved',
    SHARED = 'shared',
    SEARCH = 'search',
    USER = 'user',
    VERIFIER = 'verifier'
}
export enum FoodTypeEnum {
    ASIAN = 'Asian',
    ITALIAN = 'Italian',
    AMERICAN = 'American',
    MEXICAN = 'Mexican',
    MEDITERRANEAN = 'Mediterranean',
    CAFE = "Cafe's/Bakery",
    OTHER = 'Other'
}

export interface Coordinates {
    lat: number | null;
    lng: number | null;
}

export interface OpeningHour {
    open: string | null;
    close: string | null;
}

export type OpeningHours = [
    string | null,
    string | null,
    string | null,
    string | null,
    string | null,
    string | null,
    string | null
];

export interface Location {
    ID: string;
    createdAt: Timestamp;
    type: PostTypeEnum;
    name: string;
    searchName: string;
    lat: number;
    lng: number;
    geohash: string;
    distance?: number;
    openingHours?: OpeningHours;
    toilets?: boolean;
    phoneNumber?: string;
    website?: string;
    address: string;
    photos?: string[];
    rating?: number;
    reviews?: google.maps.places.PlaceReview[];
    priceLevel?: number;
    menu?: string;
    reservation?: string;
    labels?: LabelEnum[];
    foodTypes: FoodTypeEnum[];
    isVerified?: boolean;
    modifiedAt: Timestamp;
}
