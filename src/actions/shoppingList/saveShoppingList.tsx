import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';
import {
  SAVE_SHOPPING_LIST_ERROR,
  SAVE_SHOPPING_LIST_PENDING,
  SAVE_SHOPPING_LIST_SUCCESS
} from '../../types/ShoppingList';
import { i18n } from '../..';

function saveShoppingListPending() {
  return {
    type: SAVE_SHOPPING_LIST_PENDING
  };
}

function saveShoppingListError(error: any) {
  return {
    type: SAVE_SHOPPING_LIST_ERROR,
    error: error
  };
}
function saveShoppingListSuccess() {
  return {
    type: SAVE_SHOPPING_LIST_SUCCESS,
    success: i18n._('Your shopping list was successfully changed.')
  };
}

export function saveShoppingList(shoppingList) {
  return (dispatch: any) => {
    dispatch(saveShoppingListPending());
    axiosInstanceWithAuth
      .post(requestConsts.SHOPPING_LIST_URL, { params: shoppingList })
      .then(() => {
        dispatch(saveShoppingListSuccess());
      })
      .catch((error) => {
        if (!error.response) dispatch(saveShoppingListError(error.toString()));
        else if (error.response.status !== '403') dispatch(saveShoppingListError(error.response.statusText));
      });
  };
}
