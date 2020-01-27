import { TMeal } from './MealTypes';

export const FETCH_MEAL_PLAN_SUCCESS = 'FETCH_MEAL_PLAN_SUCCESS';
export const MEAL_PLAN_ERROR = 'MEAL_PLAN_ERROR';
export const MEAL_PLAN_PENDING = 'MEAL_PLAN_PENDING';
export const CLEAR_MEAL_PLAN_ERROR = 'CLEAR_MEAL_PLAN_ERROR';
export const CLEAR_MEAL_PLAN_SUCCESS = 'CLEAR_MEAL_PLAN_SUCCESS';
export const ADD_TO_MEAL_PLAN_SUCCESS = 'ADD_TO_MEAL_PLAN_SUCCESS';
export const REMOVE_FROM_MEAL_PLAN_SUCCESS = 'REMOVE_FROM_MEAL_PLAN_SUCCESS';

export interface FetchMealPlanAction {
  type: typeof FETCH_MEAL_PLAN_SUCCESS;
  mealPlan: TMeal[];
}

export type MealPlanActionType = FetchMealPlanAction;

export interface MealPlanState {
  mealPlan: TMeal[];
  pending: boolean;
  error: any;
  success: any;
}
