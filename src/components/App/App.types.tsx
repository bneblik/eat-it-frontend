import { MealsStateType } from '../../types/MealsTypes';

import { fetchCategories } from '../../actions/categoriesAction';

import { AuthStateType } from '../../types/AuthTypes';

import { logOut, clearAuthSuccess, clearAuthError } from '../../actions/authAction';

import { reducers } from '../../reducers';

import { CategoriesState } from '../../types/Categories';
import { MealStateType } from '../../types/MealTypes';
import { clearAddMealError, clearAddMealSuccess } from '../../actions/mealAction';

export interface AppProps {
  meals: MealsStateType;
  meal: MealStateType;
  categories: CategoriesState;
  auth: AuthStateType;
  logOut: typeof logOut;
  fetchCategories: typeof fetchCategories;
  clearAuthSuccess: typeof clearAuthSuccess;
  clearAuthError: typeof clearAuthError;
  clearAddMealError: typeof clearAddMealError;
  clearAddMealSuccess: typeof clearAddMealSuccess;
  history: any;
  location: any;
  match: any;
}

export type AppState = ReturnType<typeof reducers>;
