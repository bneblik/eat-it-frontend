import {
  REMOVE_REMINDER,
  ADD_REMINDER,
  FETCH_REMINDERS,
  RemoveReminderAction,
  AddReminderAction,
  FetchRemindersAction,
  ReminderType
} from '../types/Reminder';

export function removeReminder(reminder: ReminderType): RemoveReminderAction {
  return {
    type: REMOVE_REMINDER,
    reminder
  };
}

export function addReminder(reminder: ReminderType): AddReminderAction {
  return {
    type: ADD_REMINDER,
    reminder
  };
}

export function fetchReminders(): FetchRemindersAction {
  return {
    type: FETCH_REMINDERS,
    reminders: []
  };
}
