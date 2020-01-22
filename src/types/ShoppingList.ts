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

export type ShoppingListActionType =
  | FetchShoppingListSuccAction
  | AddToBasketAction
  | ChangeAmountListAction
  | RemoveProductListAction
  | AddProductListAction
  | SaveShoppingListAction;

export interface ShoppingListState {
  shoppingList: TShoppingList[];
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
};

export type TShoppingList = {
  category: string;
  products: ShoppingListProduct[];
};
