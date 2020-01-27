import { History, LocationState } from 'history';

export interface ChangeLangProps {
  /**
   * contains address URL
   */
  history: History<LocationState>;
  /**
   * contains @param url with information about current language
   */
  match: any;
}
export type ChangeLangState = {
  dialogOpened: boolean;
};
