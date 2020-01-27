import {
  FETCH_FRIDGE_SUCC,
  FridgeState,
  CHANGE_AMOUNT_IN_FRIDGE,
  REMOVE_PRODUCT_FROM_FRIDGE,
  ADD_PRODUCT_TO_FRIDGE,
  SAVE_FRIDGE_SUCCESS,
  SAVE_FRIDGE_PENDING,
  SAVE_FRIDGE_ERROR,
  FETCH_FRIDGE_ERROR,
  FETCH_FRIDGE_PENDING
} from '../types/Fridge';

const initialState: FridgeState = {
  fridge: [],
  error: null,
  success: null,
  pending: null
};

export function fridgeReducer(state = initialState, action: any): FridgeState {
  switch (action.type) {
    // fetch fridge
    case FETCH_FRIDGE_SUCC:
      return { ...state, fridge: action.fridge };
    case FETCH_FRIDGE_ERROR:
      return { ...state, error: action.error };
    case FETCH_FRIDGE_PENDING:
      return { ...state, pending: true };
    // change fridge
    case CHANGE_AMOUNT_IN_FRIDGE:
      const amountChanged = state.fridge.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.map((p) => (p === action.product ? { ...p, amount: action.amount } : p))
            }
          : elem
      );
      return { ...state, fridge: amountChanged };
    case REMOVE_PRODUCT_FROM_FRIDGE:
      const withoutRemoved = state.fridge.map((elem) =>
        elem.category === action.category
          ? {
              ...elem,
              products: elem.products.filter((p) => p !== action.product)
            }
          : elem
      );
      return { ...state, fridge: withoutRemoved };
    case ADD_PRODUCT_TO_FRIDGE:
      const addedProduct = state.fridge.map((elem) =>
        elem.category === action.category
          ? { ...elem, products: [...elem.products, { ...action.product, amount: action.amount }] }
          : elem
      );
      return { ...state, fridge: addedProduct };
    // save fridge
    case SAVE_FRIDGE_SUCCESS:
      return { ...state, success: action.success, pending: false };
    case SAVE_FRIDGE_PENDING:
      return { ...state, pending: true };
    case SAVE_FRIDGE_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
