export const REMOVE_REMINDER = 'REMOVE_REMINDER';

export interface RemoveReminderAction {
  type: typeof REMOVE_REMINDER;
  reminder: ReminderType;
}

export const ADD_REMINDER = 'ADD_REMINDER';

export interface AddReminderAction {
  type: typeof ADD_REMINDER;
  reminder: ReminderType;
}

export const FETCH_REMINDERS = 'FETCH_REMINDERS';

export interface FetchRemindersAction {
  type: typeof FETCH_REMINDERS;
  reminders: ReminderType[];
}

export type ReminderActionType = RemoveReminderAction | AddReminderAction | FetchRemindersAction;

export interface ReminderType {
  time: string;
  repeat: string[];
}

export interface ReminderState {
  reminders: ReminderType[];
}
