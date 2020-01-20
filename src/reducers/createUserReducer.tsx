import {
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CLEAR_CREATE_USER_ERROR,
  CreateUserStateType
} from '../types/CreateUserTypes';
const initialState: CreateUserStateType = {
  pending: false,
  user: undefined,
  error: null
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
        user: action.user
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
    default:
      return state;
  }
}
