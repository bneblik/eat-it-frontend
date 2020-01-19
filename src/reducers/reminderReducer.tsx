import {
  ReminderState,
  ADD_REMINDER,
  REMOVE_REMINDER,
  FETCH_REMINDERS,
  ReminderActionType
} from '../types/Reminder';

const initialState: ReminderState = {
  reminders: []
};

export function reminderReducer(state = initialState, action: ReminderActionType) {
  switch (action.type) {
    case ADD_REMINDER:
      return { reminders: [...state.reminders, action.reminder] };
    case REMOVE_REMINDER:
      return { reminders: state.reminders.filter((r) => r !== action.reminder) };
    case FETCH_REMINDERS:
      return { reminders: action.reminders };
    default:
      return state;
  }
}
