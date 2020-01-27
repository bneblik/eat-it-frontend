export type CommentType = {
  content: string;
  rate: number;
  author: string;
  createdAt: Date;
};

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export interface AddCommentAction {
  type: typeof ADD_COMMENT_SUCCESS;
  success: any;
}
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

export interface ClearCommentErrorsAction {
  type: typeof CLEAR_COMMENT_ERRORS;
}
export const CLEAR_COMMENT_SUCCESS = 'CLEAR_COMMENT_SUCCESS';

export interface ClearCommentSuccessAction {
  type: typeof CLEAR_COMMENT_SUCCESS;
}

export type MealCommentStateType = {
  pending: boolean;
  success: any | null;
  error: any | null;
};

export type MealCommentsActionType = AddCommentAction | ClearCommentErrorsAction | ClearCommentSuccessAction;
