import {
  FetchShoppingListSuccAction,
  TShoppingList,
  FETCH_SHOPPING_LIST_SUCC,
  FETCH_SHOPPING_LIST_ERROR,
  FETCH_SHOPPING_LIST_PENDING
} from '../../types/ShoppingList';
import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';

function fetchMyShoppingListSuccess(shoppingList: TShoppingList[]): FetchShoppingListSuccAction {
  return {
    type: FETCH_SHOPPING_LIST_SUCC,
    shoppingList
  };
}

function fetchShoppingListError(error: any) {
  return {
    type: FETCH_SHOPPING_LIST_ERROR,
    error
  };
}

function fetchShoppingListPending() {
  return {
    type: FETCH_SHOPPING_LIST_PENDING
  };
}

export function fetchMyShoppingList() {
  return (dispatch: any) => {
    dispatch(fetchShoppingListPending());
    axiosInstanceWithAuth
      .get(requestConsts.SHOPPING_LIST_URL)
      .then((response) => {
        dispatch(fetchMyShoppingListSuccess(response.data.data));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchShoppingListError(error.toString()));
        else if (error.response.status !== '403') dispatch(fetchShoppingListError(error.response.statusText));
      });
  };
}
