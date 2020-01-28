import { requestConsts, axiosInstance } from '../utils/RequestService';
import {
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CLEAR_CREATE_USER_ERROR,
  CREATE_USER_ERROR,
  CLEAR_CREATE_USER_SUCCESS
} from '../types/CreateUserTypes';
import { i18n } from '..';

function createUserPending() {
  return {
    type: CREATE_USER_PENDING
  };
}

function createUserSuccess(user: any) {
  return {
    type: CREATE_USER_SUCCESS,
    user: user,
    success: i18n._('User successfully created.')
  };
}

function createUserError(error: any) {
  return {
    type: CREATE_USER_ERROR,
    error: error
  };
}

export function createUser(userData: any) {
  return (dispatch: any) => {
    dispatch(createUserPending());
    axiosInstance
      .post(requestConsts.CREATE_USER_URL, { user: userData })
      .then((response) => {
        dispatch(createUserSuccess(response.data.content.user));
      })
      .catch((error) => {
        if (!error.response) dispatch(createUserError(error.toString()));
        else dispatch(createUserError(error.response.statusText));
      });
  };
}

export function clearCreateUserError() {
  return {
    type: CLEAR_CREATE_USER_ERROR
  };
}

export function clearCreateUserSuccess() {
  return {
    type: CLEAR_CREATE_USER_SUCCESS
  };
}
