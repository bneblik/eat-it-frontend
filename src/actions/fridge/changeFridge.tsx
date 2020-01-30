import {
  FridgeProduct,
  CHANGE_AMOUNT_IN_FRIDGE,
  REMOVE_PRODUCT_FROM_FRIDGE,
  ADD_PRODUCT_TO_FRIDGE
} from '../../types/Fridge';

export function changeAmountInFridge(product: FridgeProduct, categoryId: number, amount: string) {
  return {
    type: CHANGE_AMOUNT_IN_FRIDGE,
    product,
    categoryId,
    amount
  };
}

export function removeProductFromFridge(product: FridgeProduct, categoryId: number) {
  return {
    type: REMOVE_PRODUCT_FROM_FRIDGE,
    product,
    categoryId
  };
}

export function addProductToFridge(
  product: FridgeProduct,
  categoryId: number,
  categoryName: string,
  amount: number
) {
  return {
    type: ADD_PRODUCT_TO_FRIDGE,
    product,
    categoryId,
    categoryName,
    amount
  };
}
