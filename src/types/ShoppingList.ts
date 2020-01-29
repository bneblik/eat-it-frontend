export const FETCH_SHOPPING_LIST_SUCC = 'FETCH_SHOPPING_LIST_SUCC';

export interface FetchShoppingListSuccAction {
  type: typeof FETCH_SHOPPING_LIST_SUCC;
  shoppingList: TShoppingList[];
}

export const ADD_TO_BASKET = 'ADD_TO_BASKET';

export interface AddToBasketAction {
  type: typeof ADD_TO_BASKET;
  product: ShoppingListProduct;
  category: string;
}

export const CHANGE_AMOUNT_IN_LIST = 'CHANGE_AMOUNT_IN_LIST';

export interface ChangeAmountListAction {
  type: typeof CHANGE_AMOUNT_IN_LIST;
  product: ShoppingListProduct;
  category: string;
  amount: number;
}

export const REMOVE_PRODUCT_FROM_LIST = 'REMOVE_PRODUCT_FROM_LIST';

export interface RemoveProductListAction {
  type: typeof REMOVE_PRODUCT_FROM_LIST;
  product: ShoppingListProduct;
  category: string;
}

export const ADD_PRODUCT_TO_LIST = 'ADD_PRODUCT_TO_LIST';

export interface AddProductListAction {
  type: typeof ADD_PRODUCT_TO_LIST;
  product: ShoppingListProduct;
  category: string;
  amount: number;
}

export const SAVE_SHOPPING_LIST = 'SAVE_SHOPPING_LIST';

export interface SaveShoppingListAction {
  type: typeof SAVE_SHOPPING_LIST;
  product: ShoppingListProduct;
  category: string;
}

export const SAVE_SHOPPING_LIST_SUCCESS = 'SAVE_SHOPPING_LIST_SUCCESS';
export const SAVE_SHOPPING_LIST_PENDING = 'SAVE_SHOPPING_LIST_PENDING';
export const SAVE_SHOPPING_LIST_ERROR = 'SAVE_SHOPPING_LIST_ERROR';
export const FETCH_SHOPPING_LIST_PENDING = 'FETCH_SHOPPING_LIST_PENDING';
export const FETCH_SHOPPING_LIST_ERROR = 'FETCH_SHOPPING_LIST_ERROR';
export const FETCH_SHOPPING_LIST_SUCCESS = 'FETCH_SHOPPING_LIST_SUCCESS';
export const ADD_INGR_TO_LIST_ERROR = 'ADD_INGR_TO_LIST_ERROR';
export const ADD_INGR_TO_LIST_PENDING = 'ADD_INGR_TO_LIST_PENDING';
export const ADD_INGR_TO_LIST_SUCCESS = 'ADD_INGR_TO_LIST_SUCCESS';
export const CLEAR_SHOPPING_LIST_ERROR = 'CLEAR_SHOPPING_LIST_ERROR';
export const CLEAR_SHOPPING_LIST_SUCCESS = 'CLEAR_SHOPPING_LIST_SUCCESS';

export type ShoppingListActionType =
  | FetchShoppingListSuccAction
  | AddToBasketAction
  | ChangeAmountListAction
  | RemoveProductListAction
  | AddProductListAction
  | SaveShoppingListAction;

export interface ShoppingListState {
  shoppingList: TShoppingList[];
  error: any;
  success: any;
  pending: any;
}

export type ShoppingListProduct = {
  id: number;
  name: string;
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  amount: number;
  inBasket?: boolean;
  unit?: string;
};

export type TShoppingList = {
  category: string;
  products: ShoppingListProduct[];
};
