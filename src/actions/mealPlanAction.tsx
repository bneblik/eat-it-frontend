/* eslint-disable @typescript-eslint/camelcase */
import {
  FETCH_MEAL_PLAN_SUCCESS,
  MEAL_PLAN_PENDING,
  MEAL_PLAN_ERROR,
  CLEAR_MEAL_PLAN_ERROR,
  CLEAR_MEAL_PLAN_SUCCESS,
  ADD_TO_MEAL_PLAN_SUCCESS,
  REMOVE_FROM_MEAL_PLAN_SUCCESS,
  MARK_AS_EATEN_SUCCESS
} from '../types/MealPlan';
import { axiosInstanceWithAuth, requestConsts } from '../utils/RequestService';
import { i18n } from '..';
import { TMeal } from '../types/MealTypes';
import { format } from 'date-fns';

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

function mapDataToMealPlan(data) {
  return data.map((e) => ({
    id: e.attributes.meal_id,
    category: { id: e.attributes.category_id, name: e.attributes.category_name },
    ...e.attributes
  }));
}

export function fetchMealPlan(date: Date) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    const day = format(date, 'yyyy-MM-dd');
    axiosInstanceWithAuth
      .get(`${requestConsts.MEAL_PLAN_URL}`, { params: { date: day } })
      .then((response) => {
        const mealPlan = mapDataToMealPlan(response.data.data);
        dispatch(fetchMealPlanSuccess(mealPlan));
      })
      .catch((error) => {
        if (!error.response) dispatch(mealPlanError(error.toString()));
        else dispatch(mealPlanError(error.response.statusText));
      });
  };
}

export function clearMealPlanError() {
  return { type: CLEAR_MEAL_PLAN_ERROR };
}
export function clearMealPlanSuccess() {
  return { type: CLEAR_MEAL_PLAN_SUCCESS };
}

function addToMealPlanSuccess(meal: TMeal) {
  return {
    type: ADD_TO_MEAL_PLAN_SUCCESS,
    success: i18n._('The meal has been successfully added to your plan.'),
    meal
  };
}

export function addToMealPlan(info: any) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    axiosInstanceWithAuth
      .post(`${requestConsts.MEAL_PLAN_URL}`, info)
      .then((response) => {
        dispatch(addToMealPlanSuccess(response.data.data));
      })
      .catch((error) => {
        if (!error.response) dispatch(mealPlanError(error.toString()));
        else dispatch(mealPlanError(error.response.statusText));
      });
  };
}

function markAsEatenSuccess(mealId: number) {
  return {
    type: MARK_AS_EATEN_SUCCESS,
    success: i18n._('Meal has been marked as eaten.'),
    mealId
  };
}

export function markAsEaten(mealId: number, date: Date) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    axiosInstanceWithAuth
      .get(`${requestConsts.MEAL_PLAN_EATEN_URL}`, {
        params: {
          meal_id: mealId,
          date: format(date, 'yyyy-MM-dd')
        }
      })
      .then(() => {
        dispatch(markAsEatenSuccess(mealId));
      })
      .catch((error) => {
        if (error.response && error.response.data) dispatch(mealPlanError(error.response.data.content));
        else if (error.response.status !== '403') dispatch(mealPlanError(error.toString()));
      });
  };
}

function removeFromMealPlanSuccess(mealId: number) {
  return {
    type: REMOVE_FROM_MEAL_PLAN_SUCCESS,
    success: i18n._('Meal has been successfully removed.'),
    mealId
  };
}

export function removeFromMealPlan(mealId: number, day: Date) {
  return (dispatch: any) => {
    dispatch(mealPlanPending());
    const date = format(day, 'yyyy-MM-dd');
    axiosInstanceWithAuth
      .delete(`${requestConsts.MEAL_PLAN_URL}/1`, { params: { meal_id: mealId, date } })
      .then(() => {
        dispatch(removeFromMealPlanSuccess(mealId));
      })
      .catch((error) => {
        if (!error.response) dispatch(mealPlanError(error.toString()));
        else dispatch(mealPlanError(error.response.statusText));
      });
  };
}
