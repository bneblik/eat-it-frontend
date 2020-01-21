import { axiosInstance, requestConsts } from '../utils/RequestService';
import {
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CLEAR_CREATE_USER_ERROR,
  CREATE_USER_ERROR,
  CLEAR_CREATE_USER_SUCCESS
} from '../types/CreateUserTypes';

function createUserPending() {
  return {
    type: CREATE_USER_PENDING
  };
}

function createUserSuccess(user: any, successInfo) {
  return {
    type: CREATE_USER_SUCCESS,
    user: user,
    success: successInfo
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
        console.log(response.data);
        dispatch(createUserSuccess(response.data.content.user, 'a'));
      })
      .catch((error) => {
        const errorObject = JSON.parse(JSON.stringify(error)).message;
        dispatch(createUserError(errorObject));
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
