import { CLEAR_FRIDGE_SUCCESS, CLEAR_FRIDGE_ERROR } from '../../types/Fridge';

export function clearFridgeSuccess() {
  return {
    type: CLEAR_FRIDGE_SUCCESS
  };
}

export function clearFridgeError() {
  return {
    type: CLEAR_FRIDGE_ERROR
  };
}
