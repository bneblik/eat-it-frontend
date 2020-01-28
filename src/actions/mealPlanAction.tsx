import {
  FETCH_MEAL_PLAN_SUCCESS,
  MEAL_PLAN_PENDING,
  MEAL_PLAN_ERROR,
  CLEAR_MEAL_PLAN_ERROR,
  CLEAR_MEAL_PLAN_SUCCESS,
  ADD_TO_MEAL_PLAN_SUCCESS,
  REMOVE_FROM_MEAL_PLAN_SUCCESS
} from '../types/MealPlan';
import { axiosInstanceWithAuth, requestConsts } from '../utils/RequestService';
import { i18n } from '..';

function fetchMealPlanSuccess(data: any) {
  return {
    type: FETCH_MEAL_PLAN_SUCCESS,
    mealPlan: data
  };
}

function mealPlanPending() {
  return {
    type: MEAL_PLAN_PENDING
  };
}

function mealPlanError(error: any) {
  return {
    type: MEAL_PLAN_ERROR,
    error: error
  };
}

export function fetchMealPlan(day: Date) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    axiosInstanceWithAuth
      .get(`${requestConsts.MEAL_PLAN_URL}`, { params: { day } })
      .then((data) => {
        dispatch(fetchMealPlanSuccess(data));
      })
      .catch((error) => {
        dispatch(mealPlanError(error));
      });
  };
}

export function clearMealPlanError() {
  return { type: CLEAR_MEAL_PLAN_ERROR };
}
export function clearMealPlanSuccess() {
  return { type: CLEAR_MEAL_PLAN_SUCCESS };
}

function addToMealPlanSuccess() {
  return {
    type: ADD_TO_MEAL_PLAN_SUCCESS,
    success: i18n._('The meal has been successfully added to your plan.')
  };
}

export function addToMealPlan(info: any) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    axiosInstanceWithAuth
      .post(`${requestConsts.MEAL_PLAN_URL}`, info)
      .then(() => {
        dispatch(addToMealPlanSuccess());
      })
      .catch((error) => {
        dispatch(mealPlanError(error));
      });
  };
}

function removeFromMealPlanSuccess() {
  return {
    type: REMOVE_FROM_MEAL_PLAN_SUCCESS,
    success: i18n._('Meal has been successfully removed.')
  };
}

export function removeFromMealPlan(mealId: number, day: Date) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    axiosInstanceWithAuth
      .post(`${requestConsts.MEAL_PLAN_URL}`, { mealId, day })
      .then(() => {
        dispatch(removeFromMealPlanSuccess());
      })
      .catch((error) => {
        dispatch(mealPlanError(error));
      });
  };
}
