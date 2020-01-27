import { ADD_COMMENT_SUCCESS, CLEAR_COMMENT_ERRORS, CLEAR_COMMENT_SUCCESS } from '../types/MealCommentsTypes';

function addMealCommentSuccess(success: any) {
  return {
    type: ADD_COMMENT_SUCCESS,
    success
  };
}
export function addMealComment(content: string, rate: number) {
  return (dispatch: any) => {
    console.log(content, rate);
    dispatch(addMealCommentSuccess('Comment successfully created'));
  };
}

export function clearMealCommentsSuccess() {
  return {
    type: CLEAR_COMMENT_SUCCESS
  };
}

export function clearMealCommentsErrors() {
  return {
    type: CLEAR_COMMENT_ERRORS
  };
}
