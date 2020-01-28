import {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  Category
} from '../types/Categories';
import { axiosInstance, requestConsts } from '../utils/RequestService';

function fetchCategoriesPending() {
  return {
    type: FETCH_CATEGORIES_PENDING
  };
}

function fetchCategoriesSuccess(categories: Category[]) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories
  };
}

function fetchCategoriesError(error: any) {
  return {
    type: FETCH_CATEGORIES_ERROR,
    error: error
  };
}

export function fetchCategories() {
  return (dispatch: any) => {
    dispatch(fetchCategoriesPending());
    axiosInstance
      .get(requestConsts.CATEGORIES_URL)
      .then((response) => {
        dispatch(fetchCategoriesSuccess(response.data.data.map((e) => ({ id: e.id, ...e.attributes }))));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchCategoriesError(error.toString()));
        else dispatch(fetchCategoriesError(error.toString()));
      });
  };
}
