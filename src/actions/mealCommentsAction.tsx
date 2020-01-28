import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_ERROR,
  CLEAR_COMMENT_ERRORS,
  CLEAR_COMMENT_SUCCESS,
  REMOVE_COMMENT_SUCCESS
} from '../types/MealCommentsTypes';
import { requestConsts, axiosInstanceWithAuth } from '../utils/RequestService';
import { i18n } from '..';

function addMealCommentSuccess(success: any) {
  return {
    type: ADD_COMMENT_SUCCESS,
    success
  };
}

export function addMealCommentPending() {
  return {
    type: ADD_COMMENT_PENDING
  };
}

export function addMealCommentError(error: any) {
  return {
    type: ADD_COMMENT_ERROR,
    error: error
  };
}

export function addMealComment(content: string, rate: number, mealId: number) {
  return (dispatch: any) => {
    dispatch(addMealCommentPending());
    axiosInstanceWithAuth
      // eslint-disable-next-line @typescript-eslint/camelcase
      .post(`${requestConsts.COMMENT_URL}`, { text: content, rate, meal_id: mealId })
      .then(() => {
        dispatch(addMealCommentSuccess(i18n._('Comment successfully created')));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealCommentError(error.toString()));
        else dispatch(addMealCommentError(error.response.statusText));
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

function removeCommentSuccess(success: any) {
  return {
    type: REMOVE_COMMENT_SUCCESS,
    success
  };
}

export function removeComment(commentId: number) {
  return (dispatch: any) => {
    dispatch(addMealCommentPending());
    axiosInstanceWithAuth
      // eslint-disable-next-line @typescript-eslint/camelcase
      .delete(`${requestConsts.COMMENT_URL}`, { params: { comment_id: commentId } })
      .then(() => {
        dispatch(removeCommentSuccess(i18n._('The comment has been successfully deleted.')));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealCommentError(error.toString()));
        else dispatch(addMealCommentError(error.response.statusText));
      });
  };
}
