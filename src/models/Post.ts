import {
    GeoPoint,
    QueryDocumentSnapshot,
    SnapshotOptions,
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
    // modifiedAt: Timestamp;
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

export const reportedPostConverter = {
    toFirestore: ({
        ID,
        userID,
        postID,
        createdAt
    }: ReportedPost): ReportedPost => {
        return {
            ID: ID || '',
            userID,
            postID,
            createdAt
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ReportedPost>,
        options?: SnapshotOptions
    ): ReportedPost => {
        const { ID, userID, postID, createdAt } = snapshot.data(options);
        return {
            ID,
            userID,
            postID,
            createdAt
        };
    }
};

export const tagConverter = {
    toFirestore: ({ ID, name, count, createdAt, modifiedAt }: Tag): Tag => {
        return {
            ID: ID || '',
            name,
            count,
            createdAt,
            modifiedAt
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<Tag>,
        options?: SnapshotOptions
    ): Tag => {
        const { ID, name, count, createdAt, modifiedAt } =
            snapshot.data(options);
        return {
            ID,
            name,
            count,
            createdAt,
            modifiedAt
        };
    }
};

export const postConverter = {
    toFirestore: ({
        ID,
        userID,
        username,
        locationID,
        src,
        views,
        tiktokLink,
        tags,
        isVerified,
        createdAt,
        modifiedAt
    }: Post): FirestorePost => {
        // update/set the location in the locations collection
        // remaining information which would be the Media src (video url and thumbnail url) will go into the post
        return {
            ID: ID || '',
            userID,
            username,
            locationID,
            createdAt,
            modifiedAt,
            src,
            views,
            tags: tags || [],
            tiktokLink: tiktokLink || '',
            isVerified
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<FirestorePost>,
        options?: SnapshotOptions
    ): FirestorePost => {
        const {
            ID,
            userID,
            username,
            locationID,
            createdAt,
            modifiedAt,
            src,
            views,
            tiktokLink,
            tags,
            isVerified
        } = snapshot.data(options);
        return {
            ID,
            userID,
            username,
            locationID,
            createdAt,
            modifiedAt,
            src,
            views,
            tiktokLink,
            tags,
            isVerified
        };
    }
};
