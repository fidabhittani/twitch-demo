/**
 * Application redux store with configured middlewares and reducers.
 */

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../reducers";

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware())
);

export default store;
