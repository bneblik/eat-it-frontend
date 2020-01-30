import {
  ShoppingListProduct,
  ADD_TO_BASKET,
  CHANGE_AMOUNT_IN_LIST,
  REMOVE_PRODUCT_FROM_LIST,
  ADD_PRODUCT_TO_LIST
} from '../../types/ShoppingList';

export function addToBasket(product: ShoppingListProduct, categoryId: number) {
  return {
    type: ADD_TO_BASKET,
    product,
    categoryId
  };
}

export function changeAmountInList(product: ShoppingListProduct, categoryId: number, amount: string) {
  return {
    type: CHANGE_AMOUNT_IN_LIST,
    product,
    categoryId,
    amount
  };
}

export function removeProductFromList(product: ShoppingListProduct, categoryId: number) {
  return {
    type: REMOVE_PRODUCT_FROM_LIST,
    product,
    categoryId
  };
}

export function addProductToList(
  product: ShoppingListProduct,
  categoryId: number,
  categoryName: string,
  amount: number
) {
  return {
    type: ADD_PRODUCT_TO_LIST,
    product,
    categoryId,
    categoryName,
    amount
  };
}
