export type HeaderProps = {
  /**
   * contains address URL
   */
  history: any;
  /**
   * contains @param url with information about current language
   */
  match: any;
  /**
   * loges off the user
   */
  logout: () => void;
};
export interface HeaderState {
  responsive: boolean;
}
