import {
  FETCH_STATISTICS_SUCC,
  StatisticsState,
  FETCH_STATISTICS_PENDING,
  FETCH_STATISTICS_ERROR,
  CLEAR_STATISTICS_ERROR
} from '../types/Statistics';

const initialState: StatisticsState = {
  statistics: undefined,
  error: null,
  pending: false
};

export function statisticsReducer(state = initialState, action: any): StatisticsState {
  switch (action.type) {
    case FETCH_STATISTICS_PENDING:
      return { ...state, pending: true };
    case FETCH_STATISTICS_SUCC:
      return { ...state, pending: false, statistics: action.statistics };
    case FETCH_STATISTICS_ERROR:
      return { ...state, pending: false, error: action.error };
    case CLEAR_STATISTICS_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
