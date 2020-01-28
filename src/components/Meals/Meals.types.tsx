import { TMeal } from '../../types/MealTypes';

import { fetchMeals } from '../../actions/mealsAction';

import { MealsStateType } from '../../types/MealsTypes';

export interface MealsProps {
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains informations about meals to display
   */
  meals: TMeal[];
  /**
   * determines whether adding is pending
   */
  pending: boolean;
  /**
   * fetches meals and dispatches results
   */
  fetchMeals: typeof fetchMeals;
}
export type MealsState = { mealsReducer: MealsStateType; page: number };
