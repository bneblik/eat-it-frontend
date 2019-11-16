import { ADD_MEAL, AddMealAction } from "../types/Meals"
import { TMeal } from "../types/MealTypes";


export function addMeal(meal: TMeal) : AddMealAction{
    return {
      type: ADD_MEAL,
      meal: meal
    }
  }
