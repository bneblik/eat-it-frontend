import {
  addMealComment,
  clearMealCommentsErrors,
  clearMealCommentsSuccess
} from '../../actions/mealCommentsAction';
import { CommentType, MealCommentStateType } from '../../types/MealCommentsTypes';

export interface MealCommentsProps {
  addMealComment: typeof addMealComment;
  clearMealCommentsErrors: typeof clearMealCommentsErrors;
  clearMealCommentsSuccess: typeof clearMealCommentsSuccess;
  comments: CommentType[];
  mealId: number;
  pending: boolean;
  error: any;
  success: any;
}
export interface MealCommentsState {
  comment: string;
  rate: number;
  mealCommentsReducer: MealCommentStateType;
}

export const initialStateMeal: MealCommentsState = {
  comment: '',
  rate: 0,
  mealCommentsReducer: {} as any
};
