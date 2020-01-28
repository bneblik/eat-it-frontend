export type CalendarProps = {
  selectedDate: Date;
  changeSelectedDate: (date: Date) => void;
  dateLocale: Locale;
};

export interface CalendarState {
  open: boolean;
}
