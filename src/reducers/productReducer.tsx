import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductsActionType,
  ProductsState,
} from '../types/Products';

const initialState: ProductsState = {
  productsList: [],
};

export function productsReducer(
  state = initialState,
  action: ProductsActionType,
) {
  switch (action.type) {
    case REMOVE_PRODUCT:
      const filtered = state.productsList.filter(product => {
        return product.id !== action.productId;
      });
      return { productsList: [...filtered] };
    case ADD_PRODUCT:
      return { productsList: [...state.productsList, action.product] };
    default:
      return state;
  }
}
