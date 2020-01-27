import {
  ProductsState,
  CLEAR_PRODUCTS_ERRORS,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from '../types/Products';

const initialState: ProductsState = {
  productsList: [],
  pending: false,
  error: null
};

export function productsReducer(state = initialState, action: any): ProductsState {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        productsList: action.products.map((e) => ({ id: e.id, ...e.attributes }))
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAR_PRODUCTS_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
