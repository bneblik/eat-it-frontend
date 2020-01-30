import {
  saveAboutUser,
  fetchAboutUser,
  setUserHeight,
  setUserWeight,
  clearAboutUserError,
  clearAboutUserSuccess,
  setUserGender,
  setUserAge
} from '../../actions/aboutUserAction';

import { AboutUserState } from '../../types/AboutUser';

export interface UserPanelProps {
  height: string;
  weight: string;
  gender: string;
  age: string;
  saveAboutUser: typeof saveAboutUser;
  fetchAboutUser: typeof fetchAboutUser;
  setUserHeight: typeof setUserHeight;
  setUserWeight: typeof setUserWeight;
  setUserAge: typeof setUserAge;
  setUserGender: typeof setUserGender;
  clearAboutUserError: typeof clearAboutUserError;
  clearAboutUserSuccess: typeof clearAboutUserSuccess;
  pending: boolean;
  error: any;
  success: any;
}
export interface UserPanelState {
  aboutUserReducer: AboutUserState;
}
