export const ADD_MEAL = "ADD_MEAL";

export type TMeal = {
    id: number;
    name: string;
    recipe?: string;
}

export interface MealsState {
  mealsList: TMeal[];
}

export interface AddMealAction {
  type: typeof ADD_MEAL;
  meal: TMeal;
}

export type MealsActionType = AddMealAction;
