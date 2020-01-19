export const CHANGE_DATE = 'CHANGE_DATE';

export interface ChangeDateAction {
  type: typeof CHANGE_DATE;
  date: Date;
}

export type CalendarActionType = ChangeDateAction;

export interface DateState {
  selectedDate: Date;
}
