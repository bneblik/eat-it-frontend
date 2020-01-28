import { requestConsts, axiosInstance } from '../utils/RequestService';
import {
  FETCH_MEALS_PENDING,
  CLEAR_MEALS_ERRORS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR
} from '../types/MealsTypes';

function fetchMealsPending() {
  return {
    type: FETCH_MEALS_PENDING
  };
}

function fetchMealsSuccess(meals: any) {
  return {
    type: FETCH_MEALS_SUCCESS,
    meals: meals
  };
}

function fetchMealsError(error: any) {
  return {
    type: FETCH_MEALS_ERROR,
    error: error
  };
}

export function fetchMeals(page: number) {
  return (dispatch: any) => {
    dispatch(fetchMealsPending());
    axiosInstance
      .get(requestConsts.MEALS_URL, { params: { page } })
      .then((response) => {
        dispatch(fetchMealsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchMealsError(error.toString()));
      });
  };
}

export function clearMealsErrors() {
  return {
    type: CLEAR_MEALS_ERRORS
  };
}
