import { CreateUserStateType } from '../../types/CreateUserTypes';

import { createUser, clearCreateUserError, clearCreateUserSuccess } from '../../actions/createUserAction';

export interface SignUpState {
  createUserReducer: CreateUserStateType;
  username: string;
  email: string;
  emailErrorText: string;
  password: string;
  paswdErrorText: string;
  repeatPass: string;
  repeatPaswdErrorText: string;
}
export interface SignUpProps {
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains a success message
   */
  success: any | null;
  /**
   * determines whether adding is pending
   */
  pending: boolean;
  /**
   * creates user with given @param userData
   */
  createUser: typeof createUser;
  /**
   * clears @param error
   */
  clearCreateUserError: typeof clearCreateUserError;
  /**
   * clears @param success
   */
  clearCreateUserSuccess: typeof clearCreateUserSuccess;
}
export const initialStateSignUp = {
  email: '',
  emailErrorText: '',
  username: '',
  password: '',
  paswdErrorText: '',
  repeatPass: '',
  repeatPaswdErrorText: '',
  createUserReducer: {} as any
};
