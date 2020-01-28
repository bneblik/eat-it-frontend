import {
  addMealComment,
  clearMealCommentsErrors,
  clearMealCommentsSuccess,
  removeComment
} from '../../actions/mealCommentsAction';
import { CommentType, MealCommentStateType } from '../../types/MealCommentsTypes';

export interface MealCommentsProps {
  addMealComment: typeof addMealComment;
  removeComment: typeof removeComment;
  clearMealCommentsErrors: typeof clearMealCommentsErrors;
  clearMealCommentsSuccess: typeof clearMealCommentsSuccess;
  comments: CommentType[];
  mealId: number;
  pending: boolean;
  error: any;
  success: any;
}
export interface MealCommentsState {
  page: number;
  last: boolean;
  comments: CommentType[];
  comment: string;
  rate: number;
  mealCommentsReducer: MealCommentStateType;
  pending: boolean;
  error: any;
  success: any;
}

export const initialStateMeal: MealCommentsState = {
  comment: '',
  comments: [],
  page: 1,
  last: false,
  rate: 0,
  mealCommentsReducer: {} as any,
  pending: false,
  error: null,
  success: null
};
