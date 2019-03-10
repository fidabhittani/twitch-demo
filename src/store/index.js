/**
 * Application redux store with configured middlewares and sagas and reducers.
 */

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../reducers";

// Tweak to make the chrome dev tools work in chrome. devtools breaks in Reduxv4.0

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware())
);

export default store;
