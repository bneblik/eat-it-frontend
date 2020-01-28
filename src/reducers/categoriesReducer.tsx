import {
  CategoriesState,
  CLEAR_CATEGORIES_ERRORS,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR
} from '../types/Categories';

const initialState: CategoriesState = {
  categoriesList: [],
  pending: false,
  error: null
};

export function categoriesReducer(state = initialState, action: any): CategoriesState {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        categoriesList: action.categories
      };
    case FETCH_CATEGORIES_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAR_CATEGORIES_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
