import { combineReducers } from "redux";
import { mealsReducer } from "./mealReducer";
import { productsReducer } from "./productReducer";

export const reducers = combineReducers({
    meals: mealsReducer,
    products: productsReducer
});
