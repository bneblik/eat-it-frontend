import { addToMealPlan, clearMealPlanSuccess, clearMealPlanError } from '../../actions/mealPlanAction';

import { MealPlanState } from '../../types/MealPlan';
import { format } from 'date-fns';

export type AddToMealPlanProps = {
  /**
   * the name of meal which should be added to the meal plan
   */
  mealName: string;
  success: any;
  error: any;
  pending: boolean;
  addToMealPlan: typeof addToMealPlan;
  clearMealPlanSuccess: typeof clearMealPlanSuccess;
  clearMealPlanError: typeof clearMealPlanError;
};
export type AddToMealPlanState = {
  portion: string;
  date: string;
  dialogOpened: boolean;
  portionOptions: string[];
  mealPlanReducer: MealPlanState;
};

export const initialStateAddToMealPlan: AddToMealPlanState = {
  portion: '1',
  date: format(new Date(), 'yyyy-MM-dd'),
  dialogOpened: false,
  portionOptions: ['0.5', '1', '2'],
  mealPlanReducer: {} as any
};
