export type TMeal = {
  id: number;
  name: string;
  recipe: string;
  createdAt?: Date;
  ingredients?: string[]; //it will be whole objects list
  calories?: number;
  fats?: number;
  protein?: number;
  carbs?: number;
  prepareTime?: string;
  servings?: number;
  category?: string;
};

export const FETCH_MEAL_PENDING = 'FETCH_MEAL_PENDING';
export const FETCH_MEAL_SUCCESS = 'FETCH_MEAL_SUCCESS';
export const FETCH_MEAL_ERROR = 'FETCH_MEAL_ERROR';

export type MealStateType = {
  pending: boolean;
  meal: TMeal | undefined;
  error: any | null;
};
