import {
  MealCommentStateType,
  ADD_COMMENT_SUCCESS,
  CLEAR_COMMENT_SUCCESS,
  CLEAR_COMMENT_ERRORS,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_ERROR,
  REMOVE_COMMENT_SUCCESS
} from '../types/MealCommentsTypes';

const initialState: MealCommentStateType = {
  pending: false,
  error: null,
  success: null
};

export function mealCommentsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_COMMENT_PENDING:
      return { ...state, pending: true };
    case ADD_COMMENT_ERROR:
      return { ...state, pending: false, error: action.error };
    case ADD_COMMENT_SUCCESS:
      return { ...state, pending: false, success: action.success };
    case CLEAR_COMMENT_SUCCESS:
      return { ...state, success: null };
    case CLEAR_COMMENT_ERRORS:
      return { ...state, error: null };
    case REMOVE_COMMENT_SUCCESS:
      return { ...state, success: action.success, pending: false };
    default:
      return state;
  }
}
