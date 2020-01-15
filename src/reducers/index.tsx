import { combineReducers } from 'redux';
import { productsReducer } from './productReducer';
import { mealsReducer } from './MealsReducer';
import { mealReducer } from './mealReducer';

export const reducers = combineReducers({
  mealsReducer: mealsReducer,
  productsReducer: productsReducer,
  mealReducer: mealReducer
});
