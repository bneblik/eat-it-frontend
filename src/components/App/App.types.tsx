import { MealsStateType } from '../../types/MealsTypes';

import { fetchProducts } from '../../actions/productAction';

import { AuthStateType } from '../../types/AuthTypes';

import { logOut, clearAuthSuccess, clearAuthError } from '../../actions/authAction';

import { reducers } from '../../reducers';

import { ProductsState } from '../../types/Products';

export interface AppProps {
  meals: MealsStateType;
  products: ProductsState;
  fetchProducts: typeof fetchProducts;
  auth: AuthStateType;
  logOut: typeof logOut;
  clearAuthSuccess: typeof clearAuthSuccess;
  clearAuthError: typeof clearAuthError;
  history: any;
  location: any;
  match: any;
}

export type AppState = ReturnType<typeof reducers>;
