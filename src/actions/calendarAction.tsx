import { CHANGE_DATE, ChangeDateAction } from '../types/Calendar';

export function changeSelectedDate(date: Date): ChangeDateAction {
  return {
    type: CHANGE_DATE,
    date
  };
}
