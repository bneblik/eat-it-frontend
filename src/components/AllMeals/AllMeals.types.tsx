import { TMeal } from '../../types/MealTypes';

import { fetchMeals, clearMealsErrors } from '../../actions/mealsAction';

import { MealsStateType } from '../../types/MealsTypes';

import { History, LocationState } from 'history';
import { Category, CategoriesState } from '../../types/Categories';

export interface AllMealsProps {
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains a list of meals to display
   */
  meals: TMeal[];
  categoriesList: Category[];
  /**
   * determines whether adding is pending
   */
  pending: boolean;
  /**
   * fetches meals and dispatches the result
   */
  fetchMeals: typeof fetchMeals;
  /**
   * determines whether last page was fetched
   */
  last: boolean;
  /**
   * determines the number of the last fetched page
   */
  page: number;
  /**
   * clears @param error
   */
  clearMealsErrors: typeof clearMealsErrors;
  /**
   * contains @param search
   */
  history: History<LocationState>;
}

export type AllMealsState = {
  categoriesReducer: CategoriesState;
  mealsReducer: MealsStateType;
  cat: string;
  onlyMy: boolean;
  searcher: string;
};

export const CATEGORY = 'c';
export const ONLY_MY = 'onlyMy';
export const QUERY = 'q';
