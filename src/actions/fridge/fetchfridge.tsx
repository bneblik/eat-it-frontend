import {
  FetchFridgeSuccAction,
  TFridge,
  FETCH_FRIDGE_SUCC,
  FETCH_FRIDGE_PENDING,
  FETCH_FRIDGE_ERROR
} from '../../types/Fridge';
import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';

function fetchMyFridgeSuccess(fridge: TFridge[]): FetchFridgeSuccAction {
  return {
    type: FETCH_FRIDGE_SUCC,
    fridge
  };
}

function fetchMyFridgeError(error: any) {
  return {
    type: FETCH_FRIDGE_ERROR,
    error
  };
}

function fetchMyFridgePending() {
  return {
    type: FETCH_FRIDGE_PENDING
  };
}

export function fetchMyFridge() {
  return (dispatch: any) => {
    dispatch(fetchMyFridgePending());
    axiosInstanceWithAuth
      .get(requestConsts.FRIDGE_URL)
      .then((response) => {
        dispatch(fetchMyFridgeSuccess(response.data.data));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchMyFridgeError(error.toString()));
        else if (error.response.status !== '403') dispatch(fetchMyFridgeError(error.response.statusText));
      });
  };
}
