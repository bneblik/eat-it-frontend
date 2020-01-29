import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_ERROR,
  CLEAR_COMMENT_ERRORS,
  CLEAR_COMMENT_SUCCESS,
  REMOVE_COMMENT_SUCCESS,
  FETCH_COMMENT_SUCCESS,
  CommentType
} from '../types/MealCommentsTypes';
import { requestConsts, axiosInstance, axiosInstanceWithAuth, USER_ID } from '../utils/RequestService';
import { i18n } from '..';
import { objectToCamelCase } from '../helpers/Mapper';

function addMealCommentSuccess(comment: CommentType) {
  return {
    type: ADD_COMMENT_SUCCESS,
    success: i18n._('Comment successfully created'),
    comment
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
      .then((response) => {
        const comment = {
          id: response.data.data.id,
          ...objectToCamelCase(response.data.data.attributes)
        };
        dispatch(addMealCommentSuccess(comment));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealCommentError(error.toString()));
        else dispatch(addMealCommentError(error.response.statusText));
      });
  };
}

function fetchMealCommentsSuccess(comments: CommentType) {
  return {
    type: FETCH_COMMENT_SUCCESS,
    comments: comments
  };
}

export function fetchComments(page: number, mealId: number) {
  return (dispatch: any) => {
    dispatch(addMealCommentPending());
    axiosInstance
      .get(requestConsts.COMMENT_URL, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        params: { page: page, meal_id: mealId, user_id: localStorage.getItem(USER_ID) }
      })
      .then((response) => {
        const comments = response.data.data.map((c: any) => ({
          id: c.id,
          ...objectToCamelCase(c.attributes)
        }));
        dispatch(fetchMealCommentsSuccess(comments));
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

function removeCommentSuccess(success: any, commentId: number) {
  return {
    type: REMOVE_COMMENT_SUCCESS,
    success,
    commentId
  };
}

export function removeComment(commentId: number) {
  return (dispatch: any) => {
    dispatch(addMealCommentPending());
    axiosInstanceWithAuth
      // eslint-disable-next-line @typescript-eslint/camelcase
      .delete(`${requestConsts.COMMENT_URL}/${commentId}`)
      .then(() => {
        dispatch(removeCommentSuccess(i18n._('The comment has been successfully deleted.'), commentId));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealCommentError(error.toString()));
        else dispatch(addMealCommentError(error.response.statusText));
      });
  };
}
