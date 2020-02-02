/* eslint-disable @typescript-eslint/camelcase */
import { requestConsts, axiosInstanceWithAuth } from '../utils/RequestService';
import {
  ADD_MEAL_PENDING,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_ERROR,
  CLEAR_ADD_MEAL_SUCCESS,
  CLEAR_ADD_MEAL_ERROR,
  FETCH_MEAL_PENDING,
  FETCH_MEAL_SUCCESS,
  FETCH_MEAL_ERROR,
  TMeal,
  REMOVE_MEAL_SUCCESS
} from '../types/MealTypes';
import { i18n } from '..';

function fetchMealPending() {
  return {
    type: FETCH_MEAL_PENDING
  };
}

function fetchMealSuccess(meal: TMeal) {
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

function mapDataToMeal(data): TMeal {
  const response = data.data;
  return {
    id: response.id,
    name: response.attributes.name,
    recipe: response.attributes.recipes.map((o: any) => o.instruction),
    description: response.attributes.description,
    calories: response.attributes.calories,
    fats: response.attributes.fats,
    proteins: response.attributes.proteins,
    carbs: response.attributes.carbs,
    prepareTime: response.attributes.time,
    category: { name: response.attributes.category, id: response.attributes.category_id },
    video: response.attributes.video,
    image: response.attributes.image,
    yourMeal: response.attributes.your_meal,
    servings: response.attributes.servings,
    ingredients: data.included.map((e) => ({ ...e.attributes, id: e.attributes.product_id }))
  };
}

export function fetchMeal(id: string) {
  return (dispatch: any) => {
    dispatch(fetchMealPending());
    axiosInstanceWithAuth
      .get(`${requestConsts.MEALS_URL}/${id}`)
      .then((response) => {
        const data = mapDataToMeal(response.data);
        dispatch(fetchMealSuccess(data));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchMealError(error.toString()));
        else dispatch(fetchMealError(error.response.statusText));
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

function removeMealSuccess(successMessage: any) {
  return {
    type: REMOVE_MEAL_SUCCESS,
    success: successMessage
  };
}

function addMealError(error: any) {
  return {
    type: ADD_MEAL_ERROR,
    error: error
  };
}

function prepareFormData(meal: any) {
  const formData = new FormData();
  if (meal.image) formData.append('image', meal.image, meal.image.name);
  formData.append('name', meal.name);
  formData.append('description', meal.description);
  formData.append('recipes', JSON.stringify(meal.recipes));
  formData.append('time', meal.time);
  formData.append('servings', meal.servings);
  formData.append('meal_category_id', meal.meal_category_id);
  formData.append('video', meal.video);
  formData.append('products', JSON.stringify(meal.products));
  return formData;
}

export function addMeal(meal: any) {
  return (dispatch: any) => {
    dispatch(addMealPending());
    const formData = prepareFormData(meal);
    axiosInstanceWithAuth
      .post(requestConsts.MEALS_URL, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(() => {
        dispatch(addMealSuccess(i18n._('The meal has been successfully added.')));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealError(error.toString()));
        else dispatch(addMealError(error.response.statusText));
      });
  };
}

export function editMeal(meal: any, mealId: number) {
  return (dispatch: any) => {
    dispatch(addMealPending());
    const formData = prepareFormData(meal);
    axiosInstanceWithAuth
      .put(`${requestConsts.MEALS_URL}/${mealId}`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(() => {
        dispatch(addMealSuccess(i18n._('The meal has been successfully updated.')));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealError(error.toString()));
        else dispatch(addMealError(error.response.statusText));
      });
  };
}

export function removeMeal(mealId: number) {
  return (dispatch: any) => {
    dispatch(addMealPending());
    axiosInstanceWithAuth
      .delete(`${requestConsts.MEALS_URL}/${mealId}`)
      .then(() => {
        dispatch(removeMealSuccess(i18n._('The meal has been successfully removed.')));
      })
      .catch((error) => {
        if (!error.response) dispatch(addMealError(error.toString()));
        else dispatch(addMealError(error.response.statusText));
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
