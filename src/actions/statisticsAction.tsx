import { FETCH_STATISTICS_SUCC } from '../types/Statistics';

const exampleStatistics = {
  calories: 100,
  fats: 10,
  carbs: 0,
  proteins: -123
};

function fetchStatisticsSuccess(statistics) {
  return {
    type: FETCH_STATISTICS_SUCC,
    statistics
  };
}

// function fetchStatisticsPending() {
//   return {
//     type: FETCH_STATISTICS_PENDING
//   };
// }

// function fetchStatisticsError() {
//   return {
//     type: FETCH_STATISTICS_ERROR
//   };
// }

export function fetchStatisticsForDay(date: Date) {
  return (dispatch: any) => {
    console.log(date);
    dispatch(fetchStatisticsSuccess(exampleStatistics));
  };
}
