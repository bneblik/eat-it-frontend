import {
  FETCH_STATISTICS_SUCC,
  FETCH_STATISTICS_PENDING,
  FETCH_STATISTICS_ERROR,
  CLEAR_STATISTICS_ERROR
} from '../types/Statistics';
import { axiosInstanceWithAuth, requestConsts } from '../utils/RequestService';
import { format } from 'date-fns';

function fetchStatisticsSuccess(statistics) {
  return {
    type: FETCH_STATISTICS_SUCC,
    statistics
  };
}

function fetchStatisticsPending() {
  return {
    type: FETCH_STATISTICS_PENDING
  };
}

function fetchStatisticsError(error) {
  return {
    type: FETCH_STATISTICS_ERROR,
    error
  };
}

export function clearStatisticsError() {
  return {
    type: CLEAR_STATISTICS_ERROR
  };
}

export function fetchStatisticsForDay(date: Date) {
  return (dispatch: any) => {
    dispatch(fetchStatisticsPending());
    axiosInstanceWithAuth
      .get(requestConsts.STATISTICS_URL, { params: { date: format(date, 'yyyy-MM-dd') } })
      .then((response) => {
        dispatch(fetchStatisticsSuccess(response.data.content));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchStatisticsError(error.toString()));
        else if (error.response.status !== '403') dispatch(fetchStatisticsError(error.response.statusText));
      });
  };
}
