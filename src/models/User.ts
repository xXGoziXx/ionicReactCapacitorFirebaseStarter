import {
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
    isGuest?: boolean;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
    blacklist: string[];
}
export interface UserExplore {
    ID: string;
    posts: string[];
    current_index: number;
    createdAt: Timestamp;
    modifiedAt: Timestamp;
}
