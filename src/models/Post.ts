import {
    GeoPoint,
    Timestamp
} from 'firebase/firestore';
import { FoodTypeEnum, LabelEnum, OpeningHours } from './Location';

export interface Metadata {
    rating?: number;
    reviews?: any[];
    labels?: LabelEnum[];
    foodTypes?: FoodTypeEnum[];
    capacity?: number;
    toilets?: boolean;
    phoneNumber?: string;
    website?: string;
    priceLevel?: number;
    menu?: string;
    reservation?: string;
    isGenerated?: boolean;
}

export interface Replies {
    ID: string;
    userID: string;
    postID: string;
    text: string;
    createdAt: Timestamp;
}

export interface MediaSrc {
    thumbURL: string;
    videoURL: string;
}

export enum MediaType {
    USERS = 'posts',
    SAVED = 'postLikes'
}

export enum PostTypeEnum {
    RESTAURANT = 'restaurant',
    ACTIVITY = 'activity',
    EVENT = 'event'
}

export enum NotFoundEnum {
    FILTER = 'filter',
    PAGE = 'page'
}

export interface Tag {
    ID: string;
    name: string;
    count: number;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
}

export interface ReportedPost {
    ID: string;
    userID: string;
    postID: string;
    createdAt: Timestamp;
}

export interface Post {
    ID: string;
    userID: string;
    locationID: string;
    type: PostTypeEnum;
    locationName: string;
    location: GeoPoint;
    distance?: number;
    address: string;
    src: MediaSrc;
    username: string;
    userProfileImage: string;
    userDisplayName: string;
    openingHours: OpeningHours;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
    views: number;
    tiktokLink: string;
    isVerified: boolean;
    tags: string[];
    metadata: Metadata;
}

export interface FirestorePost {
    ID: string;
    userID: string;
    username: string;
    locationID: string;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
    views: number;
    src: MediaSrc;
    tiktokLink: string;
    tags: string[];
    isVerified: boolean;
}
