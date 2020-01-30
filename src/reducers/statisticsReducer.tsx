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
      const s = action.statistics;
      return {
        ...state,
        pending: false,
        statistics: {
          calories: s.calories.toFixed(),
          carbs: s.carbs.toFixed(),
          proteins: s.proteins.toFixed(),
          fats: s.fats.toFixed()
        }
      };
    case FETCH_STATISTICS_ERROR:
      return { ...state, pending: false, error: action.error };
    case CLEAR_STATISTICS_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
