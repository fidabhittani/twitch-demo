/**
 * APP ACTIONS
 */

import { IS_LOADING, IS_MESSAGE } from "../utils/constants";

/**
 * is loader action
 */
export const isLoading = (loading, loadingText = "Loading...") => {
  return {
    payload: {
      loading,
      loadingText
    },
    type: IS_LOADING
  };
};
/**
 * App Messages action
 */
export const isMessage = payload => {
  return {
    payload,
    type: IS_MESSAGE
  };
};
