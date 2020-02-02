import {
  MealPlanState,
  FETCH_MEAL_PLAN_SUCCESS,
  MEAL_PLAN_PENDING,
  MEAL_PLAN_ERROR,
  CLEAR_MEAL_PLAN_ERROR,
  ADD_TO_MEAL_PLAN_SUCCESS,
  CLEAR_MEAL_PLAN_SUCCESS,
  REMOVE_FROM_MEAL_PLAN_SUCCESS,
  MARK_AS_EATEN_SUCCESS
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
      return { ...state, pending: false, mealPlan: action.mealPlan };
    case MEAL_PLAN_PENDING:
      return { ...state, pending: true };
    case MEAL_PLAN_ERROR:
      return { ...state, pending: false, error: action.error };
    case ADD_TO_MEAL_PLAN_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success,
        mealPlan: [...state.mealPlan, action.meal]
      };
    case CLEAR_MEAL_PLAN_ERROR:
      return { ...state, error: null };
    case CLEAR_MEAL_PLAN_SUCCESS:
      return { ...state, success: null };
    case REMOVE_FROM_MEAL_PLAN_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success,
        mealPlan: state.mealPlan.filter((m) => m.id !== action.mealId)
      };
    case MARK_AS_EATEN_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success,
        mealPlan: state.mealPlan.map((m) => (m.id === action.mealId ? { ...m, eaten: true } : m))
      };
    default:
      return state;
  }
}
