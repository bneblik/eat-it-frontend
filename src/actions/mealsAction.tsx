/* eslint-disable @typescript-eslint/camelcase */
import { requestConsts, USER_ID, axiosInstanceWithAuth } from '../utils/RequestService';
import {
  FETCH_MEALS_PENDING,
  CLEAR_MEALS_ERRORS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR
} from '../types/MealsTypes';
import { TMeal } from '../types/MealTypes';

function fetchMealsPending() {
  return {
    type: FETCH_MEALS_PENDING
  };
}

function fetchMealsSuccess(meals: any, page: number) {
  return {
    type: FETCH_MEALS_SUCCESS,
    meals,
    page
  };
}

function fetchMealsError(error: any) {
  return {
    type: FETCH_MEALS_ERROR,
    error: error
  };
}
function mapResponseToMeals(data): TMeal[] {
  return data.map((meal) => ({
    id: meal.id,
    name: meal.attributes.name,
    calories: meal.attributes.calories,
    fats: meal.attributes.fats,
    image: meal.attributes.image,
    carbs: meal.attributes.carbs,
    proteins: meal.attributes.proteins,
    description: meal.attributes.description,
    prepareTime: meal.attributes.time,
    rate: meal.attributes.rate
  }));
}
export function fetchMeals(page: number, check?: string, categId?: number, onlyMy?: boolean) {
  return (dispatch: any) => {
    dispatch(fetchMealsPending());
    axiosInstanceWithAuth
      .get(requestConsts.MEALS_URL, {
        params: {
          page,
          check,
          meal_category_id: categId,
          my_meal: onlyMy,
          user_id: localStorage.getItem(USER_ID)
        }
      })
      .then((response) => {
        const meals = mapResponseToMeals(response.data.data);
        dispatch(fetchMealsSuccess(meals, page));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchMealsError(error.toString()));
        else dispatch(fetchMealsError(error.response.statusText));
      });
  };
}

export function clearMealsErrors() {
  return {
    type: CLEAR_MEALS_ERRORS
  };
}
