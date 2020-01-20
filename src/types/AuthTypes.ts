export const AUTH_PENDING = 'AUTH_PENDING';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
export const CLEAR_AUTH_SUCCESS = 'CLEAR_AUTH_SUCCESS';

export type AuthStateType = {
  pending: boolean;
  error: any | null;
  success: any | null;
};

export interface LogInData {
  email: string;
  password: string;
}
