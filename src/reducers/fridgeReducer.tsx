import {
  FETCH_FRIDGE_SUCC,
  FridgeState,
  CHANGE_AMOUNT_IN_FRIDGE,
  REMOVE_PRODUCT_FROM_FRIDGE,
  ADD_PRODUCT_TO_FRIDGE
} from '../types/Fridge';

const initialState: FridgeState = {
  fridge: []
};

export function fridgeReducer(state = initialState, action: any): FridgeState {
  switch (action.type) {
    case FETCH_FRIDGE_SUCC:
      return { fridge: action.fridge };
    case CHANGE_AMOUNT_IN_FRIDGE:
      const amountChanged = state.fridge.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.map((p) => (p === action.product ? { ...p, amount: action.amount } : p))
            }
          : elem
      );
      return { fridge: amountChanged };
    case REMOVE_PRODUCT_FROM_FRIDGE:
      const withoutRemoved = state.fridge.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.filter((p) => p !== action.product)
            }
          : elem
      );
      return { fridge: withoutRemoved };
    case ADD_PRODUCT_TO_FRIDGE:
      const addedProduct = state.fridge.map((elem) =>
        elem.category === action.category
          ? { ...elem, products: [...elem.products, { ...action.product, amount: action.amount }] }
          : elem
      );
      return { fridge: addedProduct };
    default:
      return state;
  }
}
