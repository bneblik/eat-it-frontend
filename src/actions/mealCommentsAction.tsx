import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_ERROR,
  CLEAR_COMMENT_ERRORS,
  CLEAR_COMMENT_SUCCESS
} from '../types/MealCommentsTypes';
import { requestConsts, axiosInstanceWithAuth } from '../utils/RequestService';

function addMealCommentSuccess(success: any) {
  return {
    type: ADD_COMMENT_SUCCESS,
    success
  };
}

function addMealCommentPending() {
  return {
    type: ADD_COMMENT_PENDING
  };
}

function addMealCommentError(error: any) {
  return {
    type: ADD_COMMENT_ERROR,
    error: error
  };
}

export function addMealComment(content: string, rate: number, mealId: number) {
  return (dispatch: any) => {
    dispatch(addMealCommentPending());
    axiosInstanceWithAuth
      .post(`${requestConsts.COMMENT_URL}`, { content, rate, meal: mealId })
      .then(() => {
        dispatch(addMealCommentSuccess('Comment successfully created'));
      })
      .catch((error) => {
        dispatch(addMealCommentError(error));
      });
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
