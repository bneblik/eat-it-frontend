import { TMeal } from "./MealTypes";

export const FETCH_MEALS_PENDING = 'FETCH_MEALS_PENDING';
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_MEALS_ERROR = 'FETCH_MEALS_ERROR';

export type MealsStateType = {
    pending: boolean,
    meals: TMeal[],
    error: any | null
};
