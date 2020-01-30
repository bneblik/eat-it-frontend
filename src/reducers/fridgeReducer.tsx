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
  FETCH_FRIDGE_PENDING,
  CLEAR_FRIDGE_SUCCESS,
  CLEAR_FRIDGE_ERROR
} from '../types/Fridge';

const initialState: FridgeState = {
  fridge: [],
  error: null,
  success: null,
  pending: false
};

function addToFridge(fridge, product, categoryId, categoryName, amount) {
  const findCategory = fridge.find((e) => e.categoryId === categoryId);
  let addedProduct = fridge;
  if (!!findCategory) {
    addedProduct = fridge.map((elem) =>
      elem.categoryId === categoryId
        ? { ...elem, products: [...elem.products, { ...product, amount: amount }] }
        : elem
    );
  } else {
    addedProduct = [
      ...fridge,
      { categoryId: categoryId, categoryName, products: [{ ...product, amount: amount }] }
    ];
  }
  return addedProduct;
}

function removeFromFridge(fridge, product, categoryId) {
  const findCategory = fridge.find((e) => e.categoryId === categoryId);
  let newFridge = fridge;
  if (!!findCategory && findCategory.products.length > 1) {
    newFridge = fridge.map((elem) =>
      elem.categoryId === categoryId
        ? {
            ...elem,
            products: elem.products.filter((p) => p !== product)
          }
        : elem
    );
  } else if (!!findCategory) {
    newFridge = fridge.filter((e) => e.categoryId !== categoryId);
  }
  return newFridge;
}

export function fridgeReducer(state = initialState, action: any): FridgeState {
  switch (action.type) {
    // fetch fridge
    case FETCH_FRIDGE_SUCC:
      return { ...state, fridge: action.fridge, pending: false };
    case FETCH_FRIDGE_ERROR:
      return { ...state, error: action.error, pending: false };
    case FETCH_FRIDGE_PENDING:
      return { ...state, pending: true };
    // change fridge
    case CHANGE_AMOUNT_IN_FRIDGE:
      const amountChanged = state.fridge.map((elem) =>
        elem.categoryId === action.categoryId
          ? {
              ...elem,
              products: elem.products.map((p) => {
                return p.id === action.product.id ? { ...p, amount: action.amount } : p;
              })
            }
          : elem
      );
      return { ...state, fridge: amountChanged };
    case REMOVE_PRODUCT_FROM_FRIDGE:
      return { ...state, fridge: removeFromFridge(state.fridge, action.product, action.categoryId) };
    case ADD_PRODUCT_TO_FRIDGE:
      return {
        ...state,
        fridge: addToFridge(
          state.fridge,
          action.product,
          action.categoryId,
          action.categoryName,
          action.amount
        )
      };
    // save fridge
    case SAVE_FRIDGE_SUCCESS:
      return { ...state, success: action.success, pending: false };
    case SAVE_FRIDGE_PENDING:
      return { ...state, pending: true };
    case SAVE_FRIDGE_ERROR:
      return { ...state, error: action.error, pending: false };
    // clear messages
    case CLEAR_FRIDGE_SUCCESS:
      return { ...state, success: null };
    case CLEAR_FRIDGE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
