import { clearToken } from "./functions";
import { validateToken } from "./twitch-api";

/**
 *  Flag to chceck if a token is validated
 */
let isAuthenticated = false;

/**
 *  Process to validate token on page loads
 */
export const authenticate = async () => {
  const { data } = await validateToken();
  if (data) {
    await localStorage.setItem("user", JSON.stringify(data));
    isAuthenticated = true;
  }
  return isAuthenticated;
};

/**
 * Invalidate token
 */

export const signout = () => {
  clearToken && clearToken();
  isAuthenticated = false;
};

/**
 * Check if authenticated
 */
export const checkAuthenticated = () => {
  return isAuthenticated;
};
