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
import { CLEAR_SHOPPING_LIST_SUCCESS, CLEAR_SHOPPING_LIST_ERROR } from '../types/ShoppingList';

const initialState: ShoppingListState = {
  shoppingList: [],
  error: null,
  success: null,
  pending: false
};

function addToShoppingList(shopingList, product, category, amount) {
  const findCategory = shopingList.find((e) => e.category === category);
  let addedProduct = shopingList;
  if (!!findCategory) {
    addedProduct = shopingList.map((elem) =>
      elem.category === category
        ? { ...elem, products: [...elem.products, { ...product, amount: amount }] }
        : elem
    );
  } else {
    addedProduct = [...shopingList, { category: category, products: [{ ...product, amount: amount }] }];
  }
  return addedProduct;
}

function removeFromShoppingList(shopingList, product, category) {
  const findCategory = shopingList.find((e) => e.category === category);
  let newShoppingList = shopingList;
  if (!!findCategory && findCategory.products.length > 1) {
    newShoppingList = shopingList.map((elem) =>
      elem.category === category
        ? {
            ...elem,
            products: elem.products.filter((p) => p !== product)
          }
        : elem
    );
  } else if (!!findCategory) {
    newShoppingList = shopingList.filter((e) => e.category !== category);
  }
  return newShoppingList;
}

export function shoppingListReducer(state = initialState, action: any): ShoppingListState {
  switch (action.type) {
    // fetch shopping list
    case FETCH_SHOPPING_LIST_SUCC:
      action.shoppingList.map((elem) => elem.products.forEach((p) => (p.inBasket = false)));
      return { ...state, shoppingList: action.shoppingList, pending: false };
    case FETCH_SHOPPING_LIST_ERROR:
      return { ...state, error: action.error, pending: false };
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
      return {
        ...state,
        shoppingList: removeFromShoppingList(state.shoppingList, action.product, action.category)
      };
    case ADD_PRODUCT_TO_LIST:
      return {
        ...state,
        shoppingList: addToShoppingList(state.shoppingList, action.product, action.category, action.amount)
      };
    // save shopping list
    case SAVE_SHOPPING_LIST_SUCCESS:
      return { ...state, success: action.success, pending: false };
    case SAVE_SHOPPING_LIST_PENDING:
      return { ...state, pending: true };
    case SAVE_SHOPPING_LIST_ERROR:
      return { ...state, error: action.error, pending: false };
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
