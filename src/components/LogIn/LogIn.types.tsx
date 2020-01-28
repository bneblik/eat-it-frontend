import { AuthStateType } from '../../types/AuthTypes';

import { logIn } from '../../actions/authAction';

import { History, LocationState } from 'history';

export interface LogInState {
  authReducer: AuthStateType;
  email: string;
  password: string;
}
export interface LogInProps {
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
   * login user with given @param userData
   */
  logIn: typeof logIn;
  /**
   * if contains @param from user will be redirected there after logging in
   */
  location: any;
  /**
   * contains address URL
   */
  history: History<LocationState>;
}
