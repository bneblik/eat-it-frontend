import {
  RecommendedMealsState,
  FETCH_RECOMMENDED_SUCCESS,
  FETCH_RECOMMENDED_PENDING,
  FETCH_RECOMMENDED_ERROR,
  CLEAR_RECOMMENDED_ERRORS
} from '../types/RecommendedMeals';

const initialState: RecommendedMealsState = {
  recommendedMeals: [],
  error: null,
  pending: false
};

export function recommendedMealsReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_RECOMMENDED_SUCCESS:
      return { ...state, recommendedMeals: action.recommendedMeals, pending: false };
    case FETCH_RECOMMENDED_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_RECOMMENDED_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAR_RECOMMENDED_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
