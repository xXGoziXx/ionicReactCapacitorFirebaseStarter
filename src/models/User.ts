import {
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp
} from 'firebase/firestore';


export enum SearchResultTypeEnum {
    GEOLOCATION = 'Geolocation Search',
    LOCATION = 'Location Search',
    ALGOLIA_KEYWORD = 'Keyword Search'
}

export enum HomePageModeEnum {
    NEAR_YOU = 'Near You',
    EXPLORE = 'Explore'
}

export type SearchResultType = {
    GEOLOCATION: {
        type: SearchResultTypeEnum.GEOLOCATION;
        createdAt: Timestamp;
        description: string;
        lat: number;
        lng: number;
        placeID: string;
    };
    ALGOLIA_KEYWORD: {
        type: SearchResultTypeEnum.ALGOLIA_KEYWORD;
        createdAt: Timestamp;
        description: string;
        objectID: string;
    };
    LOCATION: {
        type: SearchResultTypeEnum.LOCATION;
        createdAt: Timestamp;
        description: string;
        locationID: string;
    };
};
export type SearchResultTypes =
    | SearchResultType['GEOLOCATION']
    | SearchResultType['ALGOLIA_KEYWORD']
    | SearchResultType['LOCATION'];

export interface User {
    ID: string;
    aboutMe: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    profileImage: string;
    username: string;
    location: string;
    selectedOptions: string[];
    searchHistory: SearchResultType[];
    isVerified: boolean;
    isAdmin: boolean;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
}
export interface UserExplore {
    ID: string;
    posts: string[];
    current_index: number;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
}

export const userExploreConverter = {
    toFirestore: ({ID, posts, current_index, createdAt, modifiedAt}: UserExplore): DocumentData => {
        return {
           ID,
           posts,
           current_index,
           createdAt,
           modifiedAt,
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<UserExplore>,
        options?: SnapshotOptions
    ): UserExplore => {
        const {ID, posts, current_index, createdAt, modifiedAt} = snapshot.data(options);
        return {
            ID,
            posts,
            current_index,
            createdAt,
            modifiedAt
        };
    }
};

export const userConverter = {
    toFirestore: (user: User): DocumentData => {
        return {
            ID: user.ID,
            aboutMe: user.aboutMe,
            email: user.email,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            profileImage: user.profileImage,
            username: user.username,
            location: user.location,
            selectedOptions: user.selectedOptions,
            searchHistory: user.searchHistory,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            modifiedAt: user.modifiedAt
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options?: SnapshotOptions
    ): User => {
        const data = snapshot.data(options);
        return {
            ID: data.ID,
            aboutMe: data.aboutMe,
            email: data.email,
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            profileImage: data.profileImage,
            username: data.username,
            location: data.location,
            selectedOptions: data.selectedOptions,
            searchHistory: data.searchHistory,
            isVerified: data.isVerified,
            isAdmin: data.isAdmin,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt
        };
    }
};
