export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export interface SaveAboutUserAction {
  type: typeof SAVE_USER_INFO;
  weight: string;
  height: string;
}

export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export interface FetchAboutUserAction {
  type: typeof FETCH_USER_INFO;
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

export type AboutUserActionType =
  | FetchAboutUserAction
  | SaveAboutUserAction
  | SetUserHeightAction
  | SetUserWeightAction;

export interface AboutUserState {
  weight: string;
  height: string;
}
