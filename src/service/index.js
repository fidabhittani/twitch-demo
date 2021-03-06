/**
 * Application commmon request service, which will
 * handle the errors and response in success case.
 * This has been configured with dispatching error
 * messages and responsible for starting and stopping
 * the loader when making a request.
 */

import axios from "axios";
import { isLoading, isMessage } from "../actions";
import store from "../store";
import { clearToken } from "../utils/functions";
/**
 * request service wrapped with axios
 * @param params
 */
export const request = async params => {
  const { apiOptions, loadingText } = params;
  /**
   * Start loading when a request is made to the server
   */
  store.dispatch(isLoading(true, loadingText || "Loading..."));

  try {
    return await axios(apiOptions);
    /**
     * When a request complete, give back the response to
     * the caller
     */
  } catch (error) {
    const { data = {} } = error && error.response;
    /**
     * Here we can handle all sorts of errors being sent
     * from server and dispatch them to the reducer to
     * manage it in state for use on the UI. below is just
     * a sample error when the requests breaks or there occur
     * some sort of API error.
     */
    /**
     * Dispatch the message being generated by receiving erros
     * from server api.
     */
    store.dispatch(
      isMessage({
        color: "red",
        messageFlag: "negative",
        message: data.message || "Something went wrong",
        status: data.status,
        type: "error"
      })
    );
    if (data.status === 401) {
      clearToken();
    }

    setTimeout(() => {
      // store.dispatch(isMessage({}));
    }, 3000);
    return error;
  } finally {
    /**
     * When request is completed we will stop
     * the loader anyway by issuing a stop loader action.
     */
    store.dispatch(isLoading(false));
  }
};
