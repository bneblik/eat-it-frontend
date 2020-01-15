import { axiosInstance } from '../utils/RequestService';
import { FETCH_MEAL_PENDING, FETCH_MEAL_SUCCESS, FETCH_MEAL_ERROR } from '../types/MealTypes';

export function fetchMealPending() {
  return {
    type: FETCH_MEAL_PENDING
  };
}

export function fetchMealSuccess(meal: any) {
  return {
    type: FETCH_MEAL_SUCCESS,
    meal: meal
  };
}

export function fetchMealError(error: any) {
  return {
    type: FETCH_MEAL_ERROR,
    error: error
  };
}

export function fetchMeal(id: string) {
  return (dispatch: any) => {
    dispatch(fetchMealPending());
    axiosInstance
      .get(`meals/${id}`)
      .then((response) => {
        dispatch(fetchMealSuccess(response.data.content.meal));
      })
      .catch((error) => {
        dispatch(fetchMealError(error));
      });
  };
}
