import { TMeal } from '../types/MealTypes';

import {
  FETCH_RECOMMENDED_SUCCESS,
  FETCH_RECOMMENDED_ERROR,
  FETCH_RECOMMENDED_PENDING,
  CLEAR_RECOMMENDED_ERRORS
} from '../types/RecommendedMeals';
import { axiosInstance, requestConsts } from '../utils/RequestService';
import { objectToCamelCase } from '../helpers/Mapper';

function fetchRecommendedMealsSuccess(mealsList: TMeal[]) {
  return {
    type: FETCH_RECOMMENDED_SUCCESS,
    recommendedMeals: mealsList
  };
}
function fetchRecommendedMealsPending() {
  return {
    type: FETCH_RECOMMENDED_PENDING
  };
}

function fetchRecommendedMealsError(error: any) {
  return {
    type: FETCH_RECOMMENDED_ERROR,
    error: error
  };
}

function mapDataToMeals(data) {
  return data.map((e) => ({ id: e.id, prepareTime: e.attributes.time, ...objectToCamelCase(e.attributes) }));
}

export function fetchRecommendedMeals() {
  return (dispatch: any) => {
    dispatch(fetchRecommendedMealsPending());
    axiosInstance
      .get(requestConsts.RECOMMENDED_MEALS)
      .then((response) => {
        const data = mapDataToMeals(response.data.data);
        dispatch(fetchRecommendedMealsSuccess(data));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchRecommendedMealsError(error.toString()));
        else dispatch(fetchRecommendedMealsError(error.toString()));
      });
  };
}

export function clearRecommendedMealsError() {
  return {
    type: CLEAR_RECOMMENDED_ERRORS
  };
}
