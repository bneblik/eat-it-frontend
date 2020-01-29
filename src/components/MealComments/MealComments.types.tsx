import {
  addMealComment,
  clearMealCommentsErrors,
  clearMealCommentsSuccess,
  removeComment,
  fetchComments
} from '../../actions/mealCommentsAction';
import { CommentType, MealCommentStateType } from '../../types/MealCommentsTypes';

export interface MealCommentsProps {
  addMealComment: typeof addMealComment;
  removeComment: typeof removeComment;
  fetchComments: typeof fetchComments;
  clearMealCommentsErrors: typeof clearMealCommentsErrors;
  clearMealCommentsSuccess: typeof clearMealCommentsSuccess;
  mealId: number;
  pending: boolean;
  error: any;
  success: any;
  page: number;
  last: boolean;
  comments: CommentType[];
}
export interface MealCommentsState {
  comment: string;
  rate: number;
  mealCommentsReducer: MealCommentStateType;
  pending: boolean;
  error: any;
  success: any;
}

export const initialStateMeal: MealCommentsState = {
  comment: '',
  rate: 0,
  mealCommentsReducer: {} as any,
  pending: false,
  error: null,
  success: null
};
