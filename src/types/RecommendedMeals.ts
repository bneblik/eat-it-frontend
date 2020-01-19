import { TMeal } from './MealTypes';

export const FETCH_RECOMMENDED_SUCCESS = 'FETCH_RECOMMENDED_SUCCESS';

export interface FetchRecommendedMealsAction {
  type: typeof FETCH_RECOMMENDED_SUCCESS;
  recommendedMeals: TMeal[];
}

export type RecommendedMealsActionType = FetchRecommendedMealsAction;

export interface RecommendedMealsState {
  recommendedMeals: TMeal[];
}
