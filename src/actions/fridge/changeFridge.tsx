import {
  FridgeProduct,
  CHANGE_AMOUNT_IN_FRIDGE,
  REMOVE_PRODUCT_FROM_FRIDGE,
  ADD_PRODUCT_TO_FRIDGE
} from '../../types/Fridge';

export function changeAmountInFridge(product: FridgeProduct, category: string, amount: string) {
  return {
    type: CHANGE_AMOUNT_IN_FRIDGE,
    product,
    category,
    amount
  };
}

export function removeProductFromFridge(product: FridgeProduct, category: string) {
  return {
    type: REMOVE_PRODUCT_FROM_FRIDGE,
    product,
    category
  };
}

export function addProductToFridge(product: FridgeProduct, category: string, amount: number) {
  return {
    type: ADD_PRODUCT_TO_FRIDGE,
    product,
    category,
    amount
  };
}
