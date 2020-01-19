import { CHANGE_DATE, DateState, CalendarActionType } from '../types/Calendar';

const initialState: DateState = {
  selectedDate: new Date()
};

export function calendarReducer(state = initialState, action: CalendarActionType) {
  switch (action.type) {
    case CHANGE_DATE:
      return { selectedDate: action.date };
    default:
      return state;
  }
}
