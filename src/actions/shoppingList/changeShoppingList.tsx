import {
  ShoppingListProduct,
  ADD_TO_BASKET,
  CHANGE_AMOUNT_IN_LIST,
  REMOVE_PRODUCT_FROM_LIST,
  ADD_PRODUCT_TO_LIST
} from '../../types/ShoppingList';

export function addToBasket(product: ShoppingListProduct, category: string) {
  return {
    type: ADD_TO_BASKET,
    product,
    category
  };
}

export function changeAmountInList(product: ShoppingListProduct, category: string, amount: string) {
  return {
    type: CHANGE_AMOUNT_IN_LIST,
    product,
    category,
    amount
  };
}

export function removeProductFromList(product: ShoppingListProduct, category: string) {
  return {
    type: REMOVE_PRODUCT_FROM_LIST,
    product,
    category
  };
}

export function addProductToList(product: ShoppingListProduct, category: string, amount: number) {
  return {
    type: ADD_PRODUCT_TO_LIST,
    product,
    category,
    amount
  };
}
