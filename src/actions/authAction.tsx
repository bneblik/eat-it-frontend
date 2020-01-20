import { axiosInstance, requestConsts, JWT_TOKEN } from '../utils/RequestService';
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
    axiosInstance
      .post(requestConsts.LOG_IN_URL, { user: userData })
      .then((response) => {
        const jwtToken = response.headers.authorization;
        localStorage.setItem(JWT_TOKEN, jwtToken.substring(7));
        dispatch(logInSuccess());
      })
      .catch((error) => {
        let errorMessage = error;
        if (error.response) errorMessage = error.response.data.error;
        dispatch(authError(errorMessage));
      });
  };
}

export function logOut() {
  return (dispatch: any) => {
    dispatch(authPending());
    axiosInstance
      .delete(requestConsts.LOG_OUT_URL)
      .then(() => {
        localStorage.removeItem(JWT_TOKEN);
        dispatch(logOutSuccess());
      })
      .catch((error) => {
        dispatch(authError(error));
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
