import { Category } from './Categories';

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const CLEAR_PRODUCTS_ERRORS = 'CLEAR_PRODUCTS_ERRORS';

export interface FetchProductsAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  products: ProductType[];
}

export type ProductsActionType = FetchProductsAction;

export type ProductType = {
  id?: number;
  name: string;
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  category: Category;
  unit: string;
  amount?: string;
  image?: any;
};

export interface ProductsState {
  productsList: ProductType[];
  pending: boolean;
  error: any | null;
}
