import {
  saveAboutUser,
  fetchAboutUser,
  setUserHeight,
  setUserWeight,
  clearAboutUserError,
  clearAboutUserSuccess
} from '../../actions/aboutUserAction';

import { AboutUserState } from '../../types/AboutUser';

export interface UserPanelProps {
  height: string;
  weight: string;
  saveAboutUser: typeof saveAboutUser;
  fetchAboutUser: typeof fetchAboutUser;
  setUserHeight: typeof setUserHeight;
  setUserWeight: typeof setUserWeight;
  clearAboutUserError: typeof clearAboutUserError;
  clearAboutUserSuccess: typeof clearAboutUserSuccess;
  pending: boolean;
  error: any;
  success: any;
}
export interface UserPanelState {
  aboutUserReducer: AboutUserState;
}
