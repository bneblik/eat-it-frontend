import { DateState } from '../../types/Calendar';

import { MealPlanState } from '../../types/MealPlan';

import { changeSelectedDate } from '../../actions/calendarAction';

import { fetchMealPlan, clearMealPlanError } from '../../actions/mealPlanAction';

import { TMeal } from '../../types/MealTypes';

export interface MyMealPlanState {
  calendarReducer: DateState;
  mealPlanReducer: MealPlanState;
  dateLocale: Locale;
}
export interface MyMealPlanProps {
  /**
   * a date for which the meal plan is displayed
   */
  selectedDate: Date;
  /**
   * changes value of @param selectedDate
   */
  changeSelectedDate: typeof changeSelectedDate;
  /**
   * fetches meal plan and dispatches result
   */
  fetchMealPlan: typeof fetchMealPlan;
  /**
   * contains fetched meal plan of the logged in user
   */
  mealPlan: TMeal[];
  error: any;
  pending: boolean;
  clearMealPlanError: typeof clearMealPlanError;
}
