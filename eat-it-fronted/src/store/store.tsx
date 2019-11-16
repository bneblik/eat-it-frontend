import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducers";
import thunk from 'redux-thunk';

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, applyMiddleware(thunk));
