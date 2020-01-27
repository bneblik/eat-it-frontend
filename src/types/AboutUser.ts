export const SAVE_ABOUT_USER_SUCCESS = 'SAVE_ABOUT_USER_SUCCESS';

export interface SaveAboutUserAction {
  type: typeof SAVE_ABOUT_USER_SUCCESS;
  success: any;
}

export const FETCH_ABOUT_USER_SUCCESS = 'FETCH_ABOUT_USER_SUCCESS';

export interface FetchAboutUserAction {
  type: typeof FETCH_ABOUT_USER_SUCCESS;
  weight: string;
  height: string;
}

export const SET_USER_WEIGHT = 'SET_USER_WEIGHT';

export interface SetUserWeightAction {
  type: typeof SET_USER_WEIGHT;
  weight: string;
}

export const SET_USER_HEIGHT = 'SET_USER_HEIGHT';

export interface SetUserHeightAction {
  type: typeof SET_USER_HEIGHT;
  height: string;
}
export const ABOUT_USER_PENDING = 'ABOUT_USER_PENDING';
export const ABOUT_USER_ERROR = 'ABOUT_USER_ERROR';
export const CLEAR_ABOUT_USER_ERROR = 'CLEAR_ABOUT_USER_ERROR';
export const CLEAR_ABOUT_USER_SUCCESS = 'CLEAR_ABOUT_USER_SUCCESS';

export type AboutUserActionType =
  | FetchAboutUserAction
  | SaveAboutUserAction
  | SetUserHeightAction
  | SetUserWeightAction;

export interface AboutUserState {
  weight: string;
  height: string;
  error: any;
  success: any;
  pending: boolean;
}
