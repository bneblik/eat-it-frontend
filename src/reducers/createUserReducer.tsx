import {
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CLEAR_CREATE_USER_ERROR,
  CLEAR_CREATE_USER_SUCCESS,
  CreateUserStateType
} from '../types/CreateUserTypes';
const initialState: CreateUserStateType = {
  pending: false,
  user: undefined,
  error: null,
  success: null
};

export function createUserReducer(
  state: CreateUserStateType = initialState,
  action: any
): CreateUserStateType {
  switch (action.type) {
    case CREATE_USER_PENDING:
      return {
        ...state,
        pending: true
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
        success: action.success
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAR_CREATE_USER_ERROR:
      return {
        ...state,
        error: null
      };
    case CLEAR_CREATE_USER_SUCCESS:
      return {
        ...state,
        success: null
      };
    default:
      return state;
  }
}
