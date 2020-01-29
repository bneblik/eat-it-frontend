import { axiosInstanceWithAuth, requestConsts, JWT_TOKEN, USER_ID } from '../utils/RequestService';
import {
  AUTH_PENDING,
  LOG_IN_SUCCESS,
  AUTH_ERROR,
  LOG_OUT_SUCCESS,
  CLEAR_AUTH_ERROR,
  CLEAR_AUTH_SUCCESS
} from '../types/AuthTypes';
import { i18n } from '..';

function authPending() {
  return {
    type: AUTH_PENDING
  };
}

function logInSuccess() {
  return {
    type: LOG_IN_SUCCESS,
    success: i18n._('User successfully logged in')
  };
}

function authError(error: any) {
  return {
    type: AUTH_ERROR,
    error: error
  };
}

function logOutSuccess() {
  return {
    type: LOG_OUT_SUCCESS,
    success: i18n._('User successfully logged out')
  };
}

export function logIn(userData: any) {
  return (dispatch: any) => {
    dispatch(authPending());
    axiosInstanceWithAuth
      .post(requestConsts.LOG_IN_URL, { user: userData })
      .then((response) => {
        localStorage.setItem(JWT_TOKEN, response.headers.authorization);
        localStorage.setItem(USER_ID, response.data.data.id);
        dispatch(logInSuccess());
      })
      .catch((error) => {
        if (error.response && error.response.data.error) dispatch(authError(error.response.data.error));
        else dispatch(authError(error.toString()));
      });
  };
}

export function logOut() {
  return (dispatch: any) => {
    dispatch(authPending());
    axiosInstanceWithAuth
      .delete(requestConsts.LOG_OUT_URL)
      .then(() => {
        localStorage.removeItem(JWT_TOKEN);
        localStorage.removeItem(USER_ID);
        dispatch(logOutSuccess());
      })
      .catch((error) => {
        if (!error.response) dispatch(authError(error.toString()));
        else dispatch(authError(error.response.data.error));
      });
  };
}

export function clearAuthSuccess() {
  return {
    type: CLEAR_AUTH_SUCCESS
  };
}

export function clearAuthError() {
  return {
    type: CLEAR_AUTH_ERROR
  };
}
