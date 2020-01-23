import { combineReducers } from 'redux';
import { productsReducer } from './productReducer';
import { mealsReducer } from './MealsReducer';
import { mealReducer } from './mealReducer';
import { calendarReducer } from './calendarReducer';
import { mealPlanReducer } from './mealPlanReducer';
import { recommendedMealsReducer } from './recommendedMeals';
import { shoppingListReducer } from './shoppingListReducer';
import { fridgeReducer } from './fridgeReducer';
import { aboutUserReducer } from './aboutUserReducer';
import { reminderReducer } from './reminderReducer';
import { createUserReducer } from './createUserReducer';
import { authReducer } from './authReducer';
import { statisticsReducer } from './statisticsReducer';

export const reducers = combineReducers({
  mealsReducer: mealsReducer,
  productsReducer: productsReducer,
  mealReducer: mealReducer,
  calendarReducer: calendarReducer,
  mealPlanReducer: mealPlanReducer,
  recommendedMealsReducer: recommendedMealsReducer,
  shoppingListReducer: shoppingListReducer,
  fridgeReducer: fridgeReducer,
  aboutUserReducer: aboutUserReducer,
  reminderReducer: reminderReducer,
  createUserReducer: createUserReducer,
  authReducer: authReducer,
  statisticsReducer: statisticsReducer
});
