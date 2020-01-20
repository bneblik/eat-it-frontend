export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const CLEAR_CREATE_USER_ERROR = 'CLEAR_CREATE_USER_ERROR';

export type CreateUserStateType = {
  pending: boolean;
  user: UserType;
  error: any | null;
};

export interface UserType {
  id: number;
  name?: string;
  surname?: string;
  nick: string;
  age?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
  email?: string;
}
