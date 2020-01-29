import {
  SetUserHeightAction,
  SetUserWeightAction,
  SET_USER_HEIGHT,
  SET_USER_WEIGHT,
  FETCH_ABOUT_USER_SUCCESS,
  SAVE_ABOUT_USER_SUCCESS,
  ABOUT_USER_PENDING,
  ABOUT_USER_ERROR,
  CLEAR_ABOUT_USER_SUCCESS,
  CLEAR_ABOUT_USER_ERROR
} from '../types/AboutUser';
import { axiosInstanceWithAuth, requestConsts } from '../utils/RequestService';
import { i18n } from '..';

function fetchAboutUserSuccess(data: any) {
  return {
    type: FETCH_ABOUT_USER_SUCCESS,
    height: data.height,
    weight: data.weight
  };
}
function saveAboutUserSuccess() {
  return {
    type: SAVE_ABOUT_USER_SUCCESS,
    success: i18n._('Information has been saved')
  };
}

function aboutUserPending() {
  return {
    type: ABOUT_USER_PENDING
  };
}

function aboutUserError(error: any) {
  return {
    type: ABOUT_USER_ERROR,
    error: error
  };
}

export function saveAboutUser(height: string, weight: string) {
  return (dispatch: any) => {
    dispatch(aboutUserPending());
    axiosInstanceWithAuth
      .post(`${requestConsts.ABOUT_USER_URL}`, { height, weight })
      .then(() => {
        dispatch(saveAboutUserSuccess());
      })
      .catch((error) => {
        if (!error.response) dispatch(aboutUserError(error.toString()));
        else dispatch(aboutUserError(error.response.statusText));
      });
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

export function fetchAboutUser() {
  return (dispatch: any) => {
    dispatch(aboutUserPending());
    axiosInstanceWithAuth
      .get(`${requestConsts.ABOUT_USER_URL}`)
      .then((content) => {
        dispatch(fetchAboutUserSuccess(content.data.data.attributes));
      })
      .catch((error) => {
        if (!error.response) dispatch(aboutUserError(error.toString()));
        else dispatch(aboutUserError(error.response.statusText));
      });
  };
}

export function clearAboutUserSuccess() {
  return {
    type: CLEAR_ABOUT_USER_SUCCESS
  };
}

export function clearAboutUserError() {
  return {
    type: CLEAR_ABOUT_USER_ERROR
  };
}
