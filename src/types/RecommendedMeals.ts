import { TMeal } from './MealTypes';

export const FETCH_RECOMMENDED_SUCCESS = 'FETCH_RECOMMENDED_SUCCESS';
export const FETCH_RECOMMENDED_PENDING = 'FETCH_RECOMMENDED_PENDING';
export const FETCH_RECOMMENDED_ERROR = 'FETCH_RECOMMENDED_ERROR';
export const CLEAR_RECOMMENDED_ERRORS = 'CLEAR_RECOMMENDED_ERRORS';

export interface FetchRecommendedMealsAction {
  type: typeof FETCH_RECOMMENDED_SUCCESS;
  recommendedMeals: TMeal[];
}

export type RecommendedMealsActionType = FetchRecommendedMealsAction;

export interface RecommendedMealsState {
  recommendedMeals: TMeal[];
  error: any;
  pending: boolean;
}
