import {
  MealsStateType,
  FETCH_MEALS_PENDING,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR,
} from '../types/MealsTypes';

const initialState: MealsStateType = {
  pending: false,
  meals: [],
  error: null,
};

export function mealsReducer(
  state: MealsStateType = initialState,
  action: any,
): MealsStateType {
  switch (action.type) {
    case FETCH_MEALS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_MEALS_SUCCESS:
      return {
        ...state,
        pending: false,
        meals: action.meals,
      };
    case FETCH_MEALS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}
