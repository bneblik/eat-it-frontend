import { ProductsActionType, ProductsState, FETCH_PRODUCTS } from '../types/Products';

const initialState: ProductsState = {
  productsList: []
};

export function productsReducer(state = initialState, action: ProductsActionType) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { productsList: action.products };
    default:
      return state;
  }
}
