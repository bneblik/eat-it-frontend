import { axiosInstance } from "../utils/RequestService";
import { FETCH_MEALS_PENDING, FETCH_MEALS_SUCCESS, FETCH_MEALS_ERROR } from "../types/MealsTypes";

export function fetchMealsPending() {
    return {
        type: FETCH_MEALS_PENDING
    }
}

export function fetchMealsSuccess(meals: any) {
    return {
        type: FETCH_MEALS_SUCCESS,
        meals: meals
    }
}

export function fetchMealsError(error: any) {
    return {
        type: FETCH_MEALS_ERROR,
        error: error
    }
}

export function fetchMeals() {
    return (dispatch: any) => {
        dispatch(fetchMealsPending());
        axiosInstance.get('meals')
          .then((response) => {
                dispatch(fetchMealsSuccess(response.data.content.meals)); 
            })
          .catch(error => {
                dispatch(fetchMealsError(error));
            });
    }
}
