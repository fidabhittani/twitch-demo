import { combineReducers } from "redux";

/**
 * Application reducers and exported as combined reducers
 */

import { IS_LOADING, IS_MESSAGE } from "../utils/constants";

//  Initial state of reducer
const initialState = {
  loading: false,
  loadingText: "Loading...",
  message: {}
};

/**
 * app reducer
 * @param state initial state of reducer
 * @param action action to a reducer
 */
const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_LOADING:
      const { loading, loadingText } = action.payload;
      if (!loading) {
        return { ...state, loading };
      }
      return { ...state, loading, loadingText, products: [] };
    case IS_MESSAGE:
      let { payload } = action;
      if (!payload.color) {
        payload = { ...payload, color: "green" };
      }
      return { ...state, message: payload };
    default:
      return state;
  }
};

export default combineReducers({ app });
