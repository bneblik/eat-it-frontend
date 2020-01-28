import { MealsStateType } from '../../types/MealsTypes';

import { fetchProducts } from '../../actions/productAction';
import { fetchCategories } from '../../actions/categoriesAction';

import { AuthStateType } from '../../types/AuthTypes';

import { logOut, clearAuthSuccess, clearAuthError } from '../../actions/authAction';

import { reducers } from '../../reducers';

import { ProductsState } from '../../types/Products';
import { CategoriesState } from '../../types/Categories';

export interface AppProps {
  meals: MealsStateType;
  products: ProductsState;
  categories: CategoriesState;
  fetchProducts: typeof fetchProducts;
  auth: AuthStateType;
  logOut: typeof logOut;
  fetchCategories: typeof fetchCategories;
  clearAuthSuccess: typeof clearAuthSuccess;
  clearAuthError: typeof clearAuthError;
  history: any;
  location: any;
  match: any;
}

export type AppState = ReturnType<typeof reducers>;
