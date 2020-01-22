import {
  FETCH_SHOPPING_LIST_SUCC,
  ShoppingListState,
  ADD_TO_BASKET,
  REMOVE_PRODUCT_FROM_LIST,
  CHANGE_AMOUNT_IN_LIST,
  ADD_PRODUCT_TO_LIST
} from '../types/ShoppingList';

const initialState: ShoppingListState = {
  shoppingList: []
};

export function shoppingListReducer(state = initialState, action: any): ShoppingListState {
  switch (action.type) {
    case FETCH_SHOPPING_LIST_SUCC:
      action.shoppingList.map((elem) => elem.products.forEach((p) => (p.inBasket = false)));
      return { shoppingList: action.shoppingList };
    case ADD_TO_BASKET:
      const updatedList = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.map((p) => (p === action.product ? { ...p, inBasket: !p.inBasket } : p))
            }
          : elem
      );
      return { shoppingList: updatedList };
    case CHANGE_AMOUNT_IN_LIST:
      const amountChanged = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.map((p) => (p === action.product ? { ...p, amount: action.amount } : p))
            }
          : elem
      );
      return { shoppingList: amountChanged };
    case REMOVE_PRODUCT_FROM_LIST:
      const withoutRemoved = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.filter((p) => p !== action.product)
            }
          : elem
      );
      return { shoppingList: withoutRemoved };
    case ADD_PRODUCT_TO_LIST:
      const addedProduct = state.shoppingList.map((elem) =>
        elem.category === action.category
          ? { ...elem, products: [...elem.products, { ...action.product, amount: action.amount }] }
          : elem
      );
      return { shoppingList: addedProduct };
    default:
      return state;
  }
}
