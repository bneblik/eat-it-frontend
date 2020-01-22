import {
  RecommendedMealsState,
  FETCH_RECOMMENDED_SUCCESS,
  RecommendedMealsActionType
} from '../types/RecommendedMeals';

const initialState: RecommendedMealsState = {
  recommendedMeals: []
};

export function recommendedMealsReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_RECOMMENDED_SUCCESS:
      return { recommendedMeals: action.recommendedMeals };
    default:
      return state;
  }
}
