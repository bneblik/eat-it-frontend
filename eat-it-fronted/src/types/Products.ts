export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export interface AddProductAction {
  type: typeof ADD_PRODUCT;
  product: ProductType;
}

export interface RemoveProductAction {
    type: typeof REMOVE_PRODUCT;
    productId: number;
}

export type ProductsActionType = AddProductAction | RemoveProductAction;

export type ProductType = {
  id: number,
  name: string
}

export interface ProductsState {
  productsList: ProductType[];
}