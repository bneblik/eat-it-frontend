import {
  FETCH_SHOPPING_LIST_SUCC,
  ShoppingListState,
  ADD_TO_BASKET,
  REMOVE_PRODUCT_FROM_LIST,
  CHANGE_AMOUNT_IN_LIST,
  ADD_PRODUCT_TO_LIST,
  FETCH_SHOPPING_LIST_ERROR,
  FETCH_SHOPPING_LIST_PENDING,
  SAVE_SHOPPING_LIST_SUCCESS,
  SAVE_SHOPPING_LIST_PENDING,
  SAVE_SHOPPING_LIST_ERROR,
  ADD_INGR_TO_LIST_PENDING,
  ADD_INGR_TO_LIST_SUCCESS,
  ADD_INGR_TO_LIST_ERROR
} from '../types/ShoppingList';
import { CLEAR_SHOPPING_LIST_SUCCESS, CLEAR_SHOPPING_LIST_ERROR } from '../types/Fridge';

const initialState: ShoppingListState = {
  shoppingList: [],
  error: null,
  success: null,
  pending: null
};

export function shoppingListReducer(state = initialState, action: any): ShoppingListState {
  switch (action.type) {
    // fetch shopping list
    case FETCH_SHOPPING_LIST_SUCC:
      action.shoppingList.map((elem) => elem.products.forEach((p) => (p.inBasket = false)));
      return { ...state, shoppingList: action.shoppingList, pending: false };
    case FETCH_SHOPPING_LIST_ERROR:
      return { ...state, error: action.error };
    case FETCH_SHOPPING_LIST_PENDING:
      return { ...state, pending: true };
    // change shopping list
    case ADD_TO_BASKET:
      const updatedList = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.map((p) => (p === action.product ? { ...p, inBasket: !p.inBasket } : p))
            }
          : elem
      );
      return { ...state, shoppingList: updatedList };
    case CHANGE_AMOUNT_IN_LIST:
      const amountChanged = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.map((p) => (p === action.product ? { ...p, amount: action.amount } : p))
            }
          : elem
      );
      return { ...state, shoppingList: amountChanged };
    case REMOVE_PRODUCT_FROM_LIST:
      const withoutRemoved = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.filter((p) => p !== action.product)
            }
          : elem
      );
      return { ...state, shoppingList: withoutRemoved };
    case ADD_PRODUCT_TO_LIST:
      const addedProduct = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? { ...elem, products: [...elem.products, { ...action.product, amount: action.amount }] }
          : elem
      );
      return { ...state, shoppingList: addedProduct };
    // save shopping list
    case SAVE_SHOPPING_LIST_SUCCESS:
      return { ...state, success: action.success, pending: false };
    case SAVE_SHOPPING_LIST_PENDING:
      return { ...state, pending: true };
    case SAVE_SHOPPING_LIST_ERROR:
      return { ...state, error: action.error };
    // add ingredients to shopping list
    case ADD_INGR_TO_LIST_PENDING:
      return { ...state, pending: true };
    case ADD_INGR_TO_LIST_SUCCESS:
      return { ...state, success: action.success, pending: false };
    case ADD_INGR_TO_LIST_ERROR:
      return { ...state, error: action.error, pending: false };
    // clear messages
    case CLEAR_SHOPPING_LIST_SUCCESS:
      return { ...state, success: null };
    case CLEAR_SHOPPING_LIST_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
