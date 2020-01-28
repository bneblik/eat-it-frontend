import { ProductType } from './Products';
import { CommentType } from './MealCommentsTypes';
import { Category } from './Categories';

export type TMeal = {
  id?: number;
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
  category: Category;
  video: string;
  image?: any;
  rate?: number;
  comments?: CommentType[];
  your_meal?: boolean;
};

export const FETCH_MEAL_PENDING = 'FETCH_MEAL_PENDING';
export const FETCH_MEAL_SUCCESS = 'FETCH_MEAL_SUCCESS';
export const FETCH_MEAL_ERROR = 'FETCH_MEAL_ERROR';

export type MealStateType = {
  pending: boolean;
  meal: TMeal | undefined;
  error: string | null;
  success: string | null;
};

export const ADD_MEAL_PENDING = 'ADD_MEAL_PENDING';
export const ADD_MEAL_SUCCESS = 'ADD_MEAL_SUCCESS';
export const ADD_MEAL_ERROR = 'ADD_MEAL_ERROR';

export const CLEAR_ADD_MEAL_SUCCESS = 'CLEAR_ADD_MEAL_SUCCESS';
export const CLEAR_ADD_MEAL_ERROR = 'CLEAR_ADD_MEAL_ERROR';

export interface AddMealAction {
  type: typeof ADD_MEAL_SUCCESS;
  meal: TMeal;
}

export type MealsActionType = AddMealAction;
