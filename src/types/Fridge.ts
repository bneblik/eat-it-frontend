export const FETCH_FRIDGE_SUCC = 'FETCH_FRIDGE_SUCC';

export interface FetchFridgeSuccAction {
  type: typeof FETCH_FRIDGE_SUCC;
  fridge: TFridge[];
}

export const CHANGE_AMOUNT_IN_FRIDGE = 'CHANGE_AMOUNT_IN_FRIDGE';

export interface ChangeAmountFridgeAction {
  type: typeof CHANGE_AMOUNT_IN_FRIDGE;
  product: FridgeProduct;
  category: string;
  amount: number;
}

export const REMOVE_PRODUCT_FROM_FRIDGE = 'REMOVE_PRODUCT_FROM_FRIDGE';

export interface RemoveProductFridgeAction {
  type: typeof REMOVE_PRODUCT_FROM_FRIDGE;
  product: FridgeProduct;
  category: string;
}

export const ADD_PRODUCT_TO_FRIDGE = 'ADD_PRODUCT_TO_FRIDGE';

export interface AddProductFridgeAction {
  type: typeof ADD_PRODUCT_TO_FRIDGE;
  product: FridgeProduct;
  category: string;
  amount: number;
}

export const SAVE_FRIDGE = 'SAVE_FRIDGE';

export interface SaveFridgeAction {
  type: typeof SAVE_FRIDGE;
  product: FridgeProduct;
  category: string;
}

export type FridgeActionType =
  | FetchFridgeSuccAction
  | ChangeAmountFridgeAction
  | RemoveProductFridgeAction
  | AddProductFridgeAction
  | SaveFridgeAction;

export interface FridgeState {
  fridge: TFridge[];
}

export type FridgeProduct = {
  id: number;
  name: string;
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  amount: number;
};

export type TFridge = {
  category: string;
  products: FridgeProduct[];
};
