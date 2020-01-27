import { RecommendedMealsState } from '../../types/RecommendedMeals';

import { fetchRecommendedMeals, clearRecommendedMealsError } from '../../actions/recommendedMeals';

import { TMeal } from '../../types/MealTypes';

export interface RecommMealsComponentState {
  activeStep: number;
  maxSteps: number;
  recommendedMealsReducer: RecommendedMealsState;
}
export interface RecommendedMealsProps {
  /**
   * fetches 5 best rated meals
   */
  fetchRecommendedMeals: typeof fetchRecommendedMeals;
  clearRecommendedMealsError: typeof clearRecommendedMealsError;
  /**
   * contains fetched meals
   */
  recommendedMeals: TMeal[];
  pending: boolean;
  error: any;
}
