import { MealPlanState, FETCH_MEAL_PLAN_SUCCESS, MealPlanActionType } from '../types/MealPlan';

const initialState: MealPlanState = {
  mealPlan: []
};

export function mealPlanReducer(state = initialState, action: MealPlanActionType) {
  switch (action.type) {
    case FETCH_MEAL_PLAN_SUCCESS:
      return { mealPlan: action.mealPlan };
    default:
      return state;
  }
}
