import { TMeal } from '../types/MealTypes';

import { FetchMealPlanAction, FETCH_MEAL_PLAN_SUCCESS } from '../types/MealPlan';

const meal: TMeal = {
  id: 1,
  name: 'Spaghetti carbonara',
  description: 'It is a short description',
  recipe: ['Heat pasta water: Put a large pot of salted water on to boil (1 Tbsp salt for every 2 '],
  createdAt: new Date(),
  ingredients: [
    { id: 1, name: 'butter', calories: 12, fats: 123, carbs: 22, proteins: 2, category: 'dairy' }
  ],
  calories: 200,
  fats: 9,
  proteins: 16.5,
  carbs: 16,
  prepareTime: '30 min',
  category: 'dinner',
  video: 'aajds'
};
const mealsList = [1, 2, 3, 4, 5].map((i) => {
  const temp = Object.assign({}, meal);
  temp.id = i;
  temp.name += i;
  return temp;
});

export function fetchMealPlan(): FetchMealPlanAction {
  return {
    type: FETCH_MEAL_PLAN_SUCCESS,
    mealPlan: mealsList
  };
}
