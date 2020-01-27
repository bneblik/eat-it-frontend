import { CLEAR_SHOPPING_LIST_SUCCESS, CLEAR_SHOPPING_LIST_ERROR } from '../../types/ShoppingList';

export function clearShoppingListSuccess() {
  return {
    type: CLEAR_SHOPPING_LIST_SUCCESS
  };
}

export function clearShoppingListError() {
  return {
    type: CLEAR_SHOPPING_LIST_ERROR
  };
}
