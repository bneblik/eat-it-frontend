import { combineReducers } from "redux";
import { mealsReducer } from "./reducer";

export const reducers = combineReducers({
    meals: mealsReducer
});
