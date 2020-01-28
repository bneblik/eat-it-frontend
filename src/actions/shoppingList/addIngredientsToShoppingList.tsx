import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';
import {
  ADD_INGR_TO_LIST_ERROR,
  ADD_INGR_TO_LIST_PENDING,
  ADD_INGR_TO_LIST_SUCCESS
} from '../../types/ShoppingList';

function addIngredientsToListPending() {
  return {
    type: ADD_INGR_TO_LIST_PENDING
  };
}

function addIngredientsToListError(error: any) {
  return {
    type: ADD_INGR_TO_LIST_ERROR,
    error: error
  };
}
function addIngredientsToListSuccess() {
  return {
    type: ADD_INGR_TO_LIST_SUCCESS,
    success: 'Products added to your shopping list.'
  };
}

export function addIngredientsToList(ingredients: { id: number; amount: string }[]) {
  return (dispatch: any) => {
    dispatch(addIngredientsToListPending());
    axiosInstanceWithAuth
      .post(requestConsts.SHOPPING_LIST_URL, { params: ingredients })
      .then(() => {
        dispatch(addIngredientsToListSuccess());
      })
      .catch((error) => {
        if (!error.response) dispatch(addIngredientsToListError(error.toString()));
        else dispatch(addIngredientsToListError(error.response.statusText));
      });
  };
}
