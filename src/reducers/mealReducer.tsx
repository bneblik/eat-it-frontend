import {
  FETCH_MEAL_PENDING,
  FETCH_MEAL_SUCCESS,
  FETCH_MEAL_ERROR,
  MealStateType,
  ADD_MEAL_PENDING,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_ERROR,
  CLEAR_ADD_MEAL_ERROR,
  CLEAR_ADD_MEAL_SUCCESS
} from '../types/MealTypes';
import { objectToCamelCase, listToCamelCase } from '../helpers/Mapper';
const initialState: MealStateType = {
  pending: false,
  meal: undefined,
  error: null,
  success: null
};

export function mealReducer(state: MealStateType = initialState, action: any): MealStateType {
  switch (action.type) {
    case FETCH_MEAL_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_MEAL_SUCCESS:
      return { ...state, pending: false, meal: action.meal };
    case FETCH_MEAL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case ADD_MEAL_PENDING:
      return {
        ...state,
        pending: true
      };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success
      };
    case ADD_MEAL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAR_ADD_MEAL_ERROR:
      return {
        ...state,
        error: null
      };
    case CLEAR_ADD_MEAL_SUCCESS:
      return {
        ...state,
        success: null
      };
    default:
      return state;
  }
}
