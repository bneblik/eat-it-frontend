import { fetchMeal } from '../../actions/mealAction';

import { addIngredientsToList } from '../../actions/shoppingList/addIngredientsToShoppingList';

import {
  clearShoppingListError,
  clearShoppingListSuccess
} from '../../actions/shoppingList/clearMessageShoppingList';

import { TMeal, MealStateType } from '../../types/MealTypes';

import { ShoppingListState } from '../../types/ShoppingList';

export interface MealProps {
  /**
   *  @param id indicates a meal
   */
  match: {
    params: { id: string; lng: string };
  };
  history: any;
  /**
   * fetch information about meal
   * @param {string} id
   */
  fetchMeal: typeof fetchMeal;
  addIngredientsToList: typeof addIngredientsToList;
  clearShoppingListError: typeof clearShoppingListError;
  clearShoppingListSuccess: typeof clearShoppingListSuccess;
  addIngredientsToListStatus: any;
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains informations about meal if defined
   */
  meal: TMeal | undefined;
  /**
   * determines whether fetching is pending
   */
  pending: boolean;
}
export interface MealState {
  mealReducer: MealStateType;
  shoppingListReducer: ShoppingListState;
  selectAllProducts: boolean;
  selectedProducts: { id: number; amount: string }[];
}
