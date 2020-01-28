import { TMeal } from '../types/MealTypes';

import {
  FETCH_RECOMMENDED_SUCCESS,
  FETCH_RECOMMENDED_ERROR,
  FETCH_RECOMMENDED_PENDING,
  CLEAR_RECOMMENDED_ERRORS
} from '../types/RecommendedMeals';
import { axiosInstanceWithAuth, requestConsts } from '../utils/RequestService';

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

export function fetchRecommendedMeals() {
  return (dispatch: any) => {
    dispatch(fetchRecommendedMealsPending());
    axiosInstanceWithAuth
      .get(requestConsts.RECOMMENDED_MEALS)
      .then((response) => {
        dispatch(fetchRecommendedMealsSuccess(response.data.data));
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
