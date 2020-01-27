import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from '../types/Products';
import { axiosInstance, requestConsts } from '../utils/RequestService';

function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING
  };
}

function fetchProductsSuccess(products: any) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products: products.data
  };
}

function fetchProductsError(error: any) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error: error
  };
}

export function fetchProducts() {
  return (dispatch: any) => {
    dispatch(fetchProductsPending());
    axiosInstance
      .get(requestConsts.GET_PRODUCTS_URL)
      .then((response) => {
        dispatch(fetchProductsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProductsError(error.toString()));
      });
  };
}
