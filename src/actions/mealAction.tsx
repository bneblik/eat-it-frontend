import { requestConsts, axiosInstance, axiosInstanceWithAuth } from '../utils/RequestService';
import {
  ADD_MEAL_PENDING,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_ERROR,
  TMeal,
  CLEAR_ADD_MEAL_SUCCESS,
  CLEAR_ADD_MEAL_ERROR,
  FETCH_MEAL_PENDING,
  FETCH_MEAL_SUCCESS,
  FETCH_MEAL_ERROR
} from '../types/MealTypes';
import { i18n } from '..';

function fetchMealPending() {
  return {
    type: FETCH_MEAL_PENDING
  };
}

function fetchMealSuccess(meal: any) {
  return {
    type: FETCH_MEAL_SUCCESS,
    meal
  };
}

function fetchMealError(error: any) {
  return {
    type: FETCH_MEAL_ERROR,
    error: error
  };
}

export function fetchMeal(id: string) {
  return (dispatch: any) => {
    dispatch(fetchMealPending());
    axiosInstance
      .get(`${requestConsts.MEALS_URL}/${id}`)
      .then((response) => {
        dispatch(fetchMealSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMealError(error));
      });
  };
}
function addMealPending() {
  return {
    type: ADD_MEAL_PENDING
  };
}

function addMealSuccess(successMessage: any) {
  return {
    type: ADD_MEAL_SUCCESS,
    success: successMessage
  };
}

function addMealError(error: any) {
  return {
    type: ADD_MEAL_ERROR,
    error: error
  };
}

export function addMeal(meal: TMeal) {
  const data = {
    ...meal,
    time: '11',
    servings: '1',
    category: meal.category.id,
    products: meal.ingredients.map((p) => ({ id: p.id, quantity: p.amount }))
  };
  return (dispatch: any) => {
    dispatch(addMealPending());
    axiosInstanceWithAuth
      .post(requestConsts.MEALS_URL, data)
      .then(() => {
        dispatch(addMealSuccess(i18n._('The meal has been successfully added.')));
      })
      .catch((error) => {
        dispatch(addMealError(error.toString()));
      });
  };
}

export function editMeal(meal: TMeal, mealId: number) {
  return (dispatch: any) => {
    dispatch(addMealPending());
    axiosInstanceWithAuth
      .post(requestConsts.MEALS_URL, { ...meal, id: mealId })
      .then(() => {
        dispatch(addMealSuccess(i18n._('The meal has been successfully updated.')));
      })
      .catch((error) => {
        dispatch(addMealError(error.toString()));
      });
  };
}

export function clearAddMealSuccess() {
  return {
    type: CLEAR_ADD_MEAL_SUCCESS
  };
}

export function clearAddMealError() {
  return {
    type: CLEAR_ADD_MEAL_ERROR
  };
}
