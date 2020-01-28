import { ShoppingListState, TShoppingList } from '../../types/ShoppingList';

import { fetchMyShoppingList } from '../../actions/shoppingList/fetchShoppingList';

import {
  addToBasket,
  changeAmountInList,
  removeProductFromList,
  addProductToList
} from '../../actions/shoppingList/changeShoppingList';

import { saveShoppingList } from '../../actions/shoppingList/saveShoppingList';

import {
  clearShoppingListSuccess,
  clearShoppingListError
} from '../../actions/shoppingList/clearMessageShoppingList';

export interface ShoppingListCompState {
  shoppingListReducer: ShoppingListState;
}
export type ShoppingListProps = {
  /**
   * contains the shopping list of a logged in user
   */
  productsCategories: TShoppingList[];
  error: any;
  success: any;
  pending: boolean;
  fetchMyShoppingList: typeof fetchMyShoppingList;
  addToBasket: typeof addToBasket;
  changeAmount: typeof changeAmountInList;
  removeProduct: typeof removeProductFromList;
  saveShoppingList: typeof saveShoppingList;
  addProduct: typeof addProductToList;
  clearShoppingListSuccess: typeof clearShoppingListSuccess;
  clearShoppingListError: typeof clearShoppingListError;
};
