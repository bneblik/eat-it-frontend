export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export interface FetchProductsAction {
  type: typeof FETCH_PRODUCTS;
  products: ProductType[];
}

export type ProductsActionType = FetchProductsAction;

export type ProductType = {
  id: number;
  name: string;
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  category: string;
  amount?: string;
};

export interface ProductsState {
  productsList: ProductType[];
}
