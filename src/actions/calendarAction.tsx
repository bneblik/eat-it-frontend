import { CHANGE_DATE } from '../types/Calendar';
import { fetchMealPlan } from './mealPlanAction';
import { fetchStatisticsForDay } from './statisticsAction';

function newSelectedDate(date: Date) {
  return {
    type: CHANGE_DATE,
    date
  };
}

export function changeSelectedDate(date: Date) {
  return (dispatch: any) => {
    dispatch(fetchMealPlan(date));
    dispatch(fetchStatisticsForDay(date));
    dispatch(newSelectedDate(date));
  };
}
