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

export function saveFridge(fridge) {
  return (dispatch: any) => {
    dispatch(saveFridgePending());
    axiosInstanceWithAuth
      .post(requestConsts.FRIDGE_URL, { params: fridge })
      .then(() => {
        dispatch(saveFridgeSuccess());
      })
      .catch((error) => {
        dispatch(saveFridgeError(error));
      });
  };
}
