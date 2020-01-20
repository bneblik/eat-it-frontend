import {
  AUTH_PENDING,
  LOG_OUT_SUCCESS,
  LOG_IN_SUCCESS,
  CLEAR_AUTH_ERROR,
  AUTH_ERROR,
  CLEAR_AUTH_SUCCESS,
  AuthStateType
} from '../types/AuthTypes';

const initialState: AuthStateType = {
  pending: false,
  error: null,
  success: null
};

export function authReducer(state: AuthStateType = initialState, action: any): AuthStateType {
  switch (action.type) {
    case AUTH_PENDING:
      return {
        ...state,
        pending: true
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success
      };
    case CLEAR_AUTH_SUCCESS:
      return {
        ...state,
        success: null
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}
