import { fetchStatisticsForDay, clearStatisticsError } from '../../actions/statisticsAction';

import { StatisticsType, StatisticsState } from '../../types/Statistics';

export interface StatisticsProps {
  day: Date;
  /**
   * fetches statistick for @param day
   */
  fetchStatisticsForDay: typeof fetchStatisticsForDay;
  clearStatisticsError: typeof clearStatisticsError;
  /**
   * contains fetched statistics
   * value in relation to the user's daily demand calculated,
   * based on the height and weight @see UserPanel
   */
  statistics: StatisticsType | undefined;
  /**
   * determines whether fetching is pending
   */
  pending: boolean;
  error: any;
}
export interface StatisticsComponentState {
  statisticsReducer: StatisticsState;
  zoom: boolean;
}
