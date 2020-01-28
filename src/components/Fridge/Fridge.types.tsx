import { FridgeState, TFridge } from '../../types/Fridge';

import { fetchMyFridge } from '../../actions/fridge/fetchfridge';

import {
  changeAmountInFridge,
  removeProductFromFridge,
  addProductToFridge
} from '../../actions/fridge/changeFridge';

import { saveFridge } from '../../actions/fridge/saveFridge';

import { clearFridgeSuccess, clearFridgeError } from '../../actions/fridge/clearMessageFridge';

export interface FridgeCompState {
  fridgeReducer: FridgeState;
}
export type FridgeProps = {
  /**
   * contains the fridge of a logged in user
   */
  productsCategories: TFridge[];
  error: any;
  success: any;
  pending: boolean;
  fetchMyFridge: typeof fetchMyFridge;
  changeAmount: typeof changeAmountInFridge;
  removeProduct: typeof removeProductFromFridge;
  addProduct: typeof addProductToFridge;
  saveFridge: typeof saveFridge;
  clearFridgeSuccess: typeof clearFridgeSuccess;
  clearFridgeError: typeof clearFridgeError;
};
