/**
 *  Get Access token from localstorage
 */

export const getUserAccessToken = () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return access_token;
  }
  return null;
};
/**
 *  Clear Tokens
 */

export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("expires_in");
};

/**
 *  Convert camelCase to underscore
 */

export const camelCaseToUnderscore = str => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1_").toLowerCase();
};

/**
 *  Get LoggedIn user
 */
export const getUser = () => {
  if (localStorage.user) {
    return JSON.parse(localStorage.user);
  }
  return {};
};
