import {
  MealCommentStateType,
  ADD_COMMENT_SUCCESS,
  CLEAR_COMMENT_SUCCESS,
  CLEAR_COMMENT_ERRORS
} from '../types/MealCommentsTypes';

const initialState: MealCommentStateType = {
  pending: false,
  error: null,
  success: null
};

export function mealCommentsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS:
      return { ...state, pending: false, success: action.success };
    case CLEAR_COMMENT_SUCCESS:
      return { ...state, success: null };
    case CLEAR_COMMENT_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
}
