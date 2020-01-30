import { SAVE_FRIDGE_PENDING, SAVE_FRIDGE_ERROR, SAVE_FRIDGE_SUCCESS } from '../../types/Fridge';
import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';
import { i18n } from '../..';

function saveFridgePending() {
  return {
    type: SAVE_FRIDGE_PENDING
  };
}

function saveFridgeError(error: any) {
  return {
    type: SAVE_FRIDGE_ERROR,
    error: error
  };
}
function saveFridgeSuccess() {
  return {
    type: SAVE_FRIDGE_SUCCESS,
    success: i18n._('Your fridge was successfully changed.')
  };
}

function mapFridgeToData(fridge) {
  let data = [];
  fridge.forEach((e) => {
    data = [...data, ...e.products];
  });
  return data.map((p) => ({ id: p.id, amount: p.amount }));
}

export function saveFridge(fridge) {
  return (dispatch: any) => {
    dispatch(saveFridgePending());
    const data = mapFridgeToData(fridge);
    axiosInstanceWithAuth
      .post(requestConsts.FRIDGE_URL, { products: data })
      .then(() => {
        dispatch(saveFridgeSuccess());
      })
      .catch((error) => {
        if (!error.response) dispatch(saveFridgeError(error.toString()));
        else if (error.response.status !== '403') dispatch(saveFridgeError(error.response.statusText));
      });
  };
}
