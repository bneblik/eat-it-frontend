export const FETCH_CATEGORIES_PENDING = 'FETCH_CATEGORIES_PENDING';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const CLEAR_CATEGORIES_ERRORS = 'CLEAR_CATEGORIES_ERRORS';

export interface FetchCategoriesAction {
  type: typeof FETCH_CATEGORIES_SUCCESS;
  categories: Category[];
}

export type CategoriesActionType = FetchCategoriesAction;

export interface CategoriesState {
  categoriesList: Category[];
  pending: boolean;
  error: any | null;
}

export type Category = {
  id: number;
  name: string;
};
