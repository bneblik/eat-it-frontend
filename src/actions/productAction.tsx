import {
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  AddProductAction,
  RemoveProductAction,
  ProductType,
} from '../types/Products';

export function addProduct(product: ProductType): AddProductAction {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function removeProduct(productId: number): RemoveProductAction {
  return {
    type: REMOVE_PRODUCT,
    productId,
  };
}
