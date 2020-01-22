import { MealPlanState, FETCH_MEAL_PLAN_SUCCESS } from '../types/MealPlan';

const initialState: MealPlanState = {
  mealPlan: []
};

export function mealPlanReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_MEAL_PLAN_SUCCESS:
      return { mealPlan: action.mealPlan };
    default:
      return state;
  }
}
