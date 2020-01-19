import {
  SAVE_USER_INFO,
  FETCH_USER_INFO,
  SaveAboutUserAction,
  FetchAboutUserAction,
  SetUserHeightAction,
  SetUserWeightAction,
  SET_USER_HEIGHT,
  SET_USER_WEIGHT
} from '../types/AboutUser';

export function saveAboutUser(): SaveAboutUserAction {
  return {
    type: SAVE_USER_INFO,
    height: '170',
    weight: '65'
  };
}

export function setUserHeight(height: string): SetUserHeightAction {
  return {
    type: SET_USER_HEIGHT,
    height
  };
}

export function setUserWeight(weight: string): SetUserWeightAction {
  return {
    type: SET_USER_WEIGHT,
    weight
  };
}

export function fetchAboutUser(): FetchAboutUserAction {
  return {
    type: FETCH_USER_INFO,
    height: '165',
    weight: '60'
  };
}
