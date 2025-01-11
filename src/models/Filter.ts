import { DistanceFilterEnum, FoodTypeEnum, LabelEnum } from './Location';

export enum FilterEnum {
    LABELS = 'labels',
    DISTANCE = 'distance',
    FOOD_TYPE = 'foodTypes'
}

export type FilterType = {
    [FilterEnum.LABELS]: LabelEnum[];
    [FilterEnum.DISTANCE]: DistanceFilterEnum;
    [FilterEnum.FOOD_TYPE]: FoodTypeEnum[];
};