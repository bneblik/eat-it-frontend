import {
  MealsStateType,
  FETCH_MEALS_PENDING,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR,
  CLEAR_MEALS_ERRORS
} from '../types/MealsTypes';

const initialState: MealsStateType = {
  pending: false,
  meals: [],
  error: null,
  last: false,
  page: 1
};

export function mealsReducer(state: MealsStateType = initialState, action: any): MealsStateType {
  switch (action.type) {
    case FETCH_MEALS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_MEALS_SUCCESS:
      let mealsList = [];
      if (action.page > 1) mealsList = [...state.meals, ...action.meals];
      else mealsList = action.meals;
      return {
        ...state,
        pending: false,
        meals: mealsList,
        last: action.meals.length === 0,
        page: action.page + 1
      };
    case FETCH_MEALS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAR_MEALS_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
