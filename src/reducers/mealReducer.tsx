import {
  FETCH_MEAL_PENDING,
  FETCH_MEAL_SUCCESS,
  FETCH_MEAL_ERROR,
  MealStateType,
  ADD_MEAL
} from '../types/MealTypes';
const initialState: MealStateType = {
  pending: false,
  meal: undefined,
  error: null
};

export function mealReducer(state: MealStateType = initialState, action: any): MealStateType {
  switch (action.type) {
    case FETCH_MEAL_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_MEAL_SUCCESS:
      return {
        ...state,
        pending: false,
        meal: action.meal
      };
    case FETCH_MEAL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case ADD_MEAL:
      return {
        ...state,
        pending: false,
        meal: action.meal
      };
    default:
      return state;
  }
}
