import { ADD_MEAL, TMeal, AddMealAction } from "../types/Meals"


export function addMeal(meal: TMeal) : AddMealAction{
    return {
      type: ADD_MEAL,
      meal: meal
    }
  }
