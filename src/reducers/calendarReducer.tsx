import { CHANGE_DATE, DateState } from '../types/Calendar';

const initialState: DateState = {
  selectedDate: new Date()
};

export function calendarReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_DATE:
      return { selectedDate: action.date };
    default:
      return state;
  }
}
