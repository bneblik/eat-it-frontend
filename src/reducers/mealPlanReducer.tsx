import {
  MealPlanState,
  FETCH_MEAL_PLAN_SUCCESS,
  MEAL_PLAN_PENDING,
  MEAL_PLAN_ERROR,
  CLEAR_MEAL_PLAN_ERROR,
  ADD_TO_MEAL_PLAN_SUCCESS,
  CLEAR_MEAL_PLAN_SUCCESS,
  REMOVE_FROM_MEAL_PLAN_SUCCESS
} from '../types/MealPlan';

const initialState: MealPlanState = {
  mealPlan: [],
  pending: false,
  error: null,
  success: null
};

export function mealPlanReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_MEAL_PLAN_SUCCESS:
      return { ...state, mealPlan: action.mealPlan };
    case MEAL_PLAN_PENDING:
      return { ...state, pending: true };
    case MEAL_PLAN_ERROR:
      return { ...state, pending: false, error: action.error };
    case ADD_TO_MEAL_PLAN_SUCCESS:
      return { ...state, pending: false, success: action.success };
    case CLEAR_MEAL_PLAN_ERROR:
      return { ...state, error: null };
    case CLEAR_MEAL_PLAN_SUCCESS:
      return { ...state, success: null };
    case REMOVE_FROM_MEAL_PLAN_SUCCESS:
      return { ...state, pending: false, success: action.success };
    default:
      return state;
  }
}
