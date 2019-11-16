import { TMeal } from "./MealTypes";

export const ADD_MEAL = "ADD_MEAL";

export interface MealsState {
  mealsList: TMeal[];
}

export interface AddMealAction {
  type: typeof ADD_MEAL;
  meal: TMeal;
}

export type MealsActionType = AddMealAction;
