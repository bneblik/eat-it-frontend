export const FETCH_STATISTICS_SUCC = 'FETCH_STATISTICS_SUCC';

export interface StatisticsSuccAction {
  type: typeof FETCH_STATISTICS_SUCC;
  statistics: StatisticsType;
}

export const FETCH_STATISTICS_ERROR = 'FETCH_STATISTICS_ERROR';

export interface StatisticsErrAction {
  type: typeof FETCH_STATISTICS_ERROR;
  error: string;
}

export const FETCH_STATISTICS_PENDING = 'FETCH_STATISTICS_PENDING';

export interface StatisticsPendingAction {
  type: typeof FETCH_STATISTICS_PENDING;
  pending: boolean;
}

export type ShoppingListActionType = StatisticsSuccAction | StatisticsErrAction | StatisticsPendingAction;

export interface StatisticsState {
  statistics: StatisticsType;
  pending: boolean;
  error: null | string;
}

export type StatisticsType = {
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
};
