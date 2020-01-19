import { TMeal } from './MealTypes';

export const FETCH_MEAL_PLAN_SUCCESS = 'FETCH_MEAL_PLAN_SUCCESS';

export interface FetchMealPlanAction {
  type: typeof FETCH_MEAL_PLAN_SUCCESS;
  mealPlan: TMeal[];
}

export type MealPlanActionType = FetchMealPlanAction;

export interface MealPlanState {
  mealPlan: TMeal[];
}
