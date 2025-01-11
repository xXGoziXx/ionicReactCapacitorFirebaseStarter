import { FoodTypeEnum, LabelEnum, Location } from './Location';

export enum VideoVerifierMode {
    UNVERIFIED = 'unverified',
    VERIFIED = 'verified'
}
export enum PreviewMode {
    VERIFIED = 'VERIFIED',
    UNVERIFIED = 'UNVERIFIED',
    ADD = 'ADD'
}

export enum AdminFormMode {
    ADD = 'ADD',
    EDIT = 'EDIT'
}


export type PostBotVideo = {
    link: string;
    accuracy: number;
    reason: string;
    ocr: string;
    thumbnail: string;
};

export type PostBotLabel = {
    label: LabelEnum;
    accuracy: number;
    reason: string;
};

export type PostBotFoodType = {
    label: FoodTypeEnum;
    accuracy: number;
    reason: string;
};

export type AIRestaurantInfo = {
    menu: string[];
    reservation: string[];
    foodTypes: PostBotFoodType[];
    labels: PostBotLabel[];
};

export type PostBotResults = {
    menu: string[];
    reservation: string[];
    videos: PostBotVideo[];
    labels: PostBotLabel[];
};

export interface UnifiedEditableData {
    videoLink: string;
    menu: string;
    reservation: string;
    foodType: (FoodTypeEnum | PostBotLabel)[];
    foodType1: FoodTypeEnum | PostBotLabel | string;
    foodType2: FoodTypeEnum | PostBotLabel | string;
}

export enum EditableDataUpdate {
    VIDEO_LINK = 'videoLink',
    ALL = 'all'
}

export type LocationWithPostCount = {
    restaurant: Location;
    videoCount: number;
};

export const isPostBotLabel = (
    label: string | PostBotLabel
): label is PostBotLabel => {
    return (label as PostBotLabel)?.label !== undefined;
};

export const isFoodTypeEnum = (value: any) => {
    if (typeof value === 'string') {
        return Object.values(FoodTypeEnum).includes(value as FoodTypeEnum);
    } else {
        return false;
    }
};

// export const getPostBotLabel = (foodTypes: PostBotLabel[]): FoodTypeEnum[] => {
//     return foodTypes.map(({ label }) => label) as FoodTypeEnum[];
// };

// export const getLabels = (
//     foodType: (FoodTypeEnum | PostBotLabel)[]
// ): FoodTypeEnum[] => {
//     if (isFoodTypeEnum(foodType[0])) {
//         return (foodType as FoodTypeEnum[]).slice(0, 2);
//     } else {
//         return getPostBotLabel(foodType as PostBotLabel[]).slice(0, 2);
//     }
// };
