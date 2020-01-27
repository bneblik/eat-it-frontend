import { TMeal } from '../../types/MealTypes';

export type EditMealState = {
  dialogOpened: boolean;
};

export type EditMealProps = {
  mealToEdit: TMeal;
};
export const defultStateEditMeal: EditMealState = {
  dialogOpened: false
};
