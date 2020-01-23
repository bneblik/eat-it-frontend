import { ProductType } from './Products';
import { CommentType } from './MealCommentsTypes';

export type TMeal = {
  id: number;
  name: string;
  recipe: string[];
  description: string;
  createdAt?: Date;
  ingredients?: ProductType[];
  calories?: number;
  fats?: number;
  proteins?: number;
  carbs?: number;
  prepareTime: string;
  category: string;
  video: string;
  image?: any;
  comments?: CommentType[];
};

export const FETCH_MEAL_PENDING = 'FETCH_MEAL_PENDING';
export const FETCH_MEAL_SUCCESS = 'FETCH_MEAL_SUCCESS';
export const FETCH_MEAL_ERROR = 'FETCH_MEAL_ERROR';

export type MealStateType = {
  pending: boolean;
  meal: TMeal | undefined;
  error: any | null;
};

export const ADD_MEAL = 'ADD_MEAL';

export interface AddMealAction {
  type: typeof ADD_MEAL;
  meal: TMeal;
}

export type MealsActionType = AddMealAction;
