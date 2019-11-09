import { createStore } from "redux";
import { reducers } from "../reducers";

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers);
