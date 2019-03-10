import { request } from "../service";
import queryString from "query-string";
import { camelCaseToUnderscore } from "./functions";
import { getUserAccessToken, getUser } from "./functions";
const twitchService = `https://id.twitch.tv/oauth2`;
const twitchServiceAuth = `https://api.twitch.tv/kraken`;
/**
 *  Get Env variables for secrets
 */

export const clientCredentials = {
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
  redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`
};

const getUnderscored = camelCaseObj => {
  return Object.keys(camelCaseObj).reduce((newObj, next) => {
    newObj[camelCaseToUnderscore(next)] = camelCaseObj[next];
    return newObj;
  }, {});
};
/**
 *  Getting access token by code
 * @param {*} param0
 */
export const getAccessToken = async payLoad => {
  payLoad = getUnderscored({ ...clientCredentials, ...payLoad });

  const stringifiedPayload = queryString.stringify(payLoad);

  const response = request({
    loadingText: "Wait...Signing You In",
    apiOptions: {
      method: "post",
      url: `${twitchService}/token?${stringifiedPayload}`
    }
  });
  return response || {};
};

/**
 * Get Login Url
 */

export const getLoginUrl = () => {
  const { clientId, redirectUri } = clientCredentials;
  const payLoad = getUnderscored({ clientId, redirectUri });
  const stringifiedPayload = queryString.stringify({
    ...payLoad,
    response_type: "code",
    scope: "user_read user_follows_edit channel_read"
  });

  return `${twitchServiceAuth}/oauth2/authorize?${stringifiedPayload}`;
};

/**
 *  Validate token
 */

export const validateToken = async () => {
  if (!getUserAccessToken()) {
    return {};
  }
  return await request({
    loadingText: "Loading...",
    apiOptions: {
      method: "get",
      url: `${twitchService}/validate`,
      headers: {
        Authorization: `OAuth ${getUserAccessToken()}`
      }
    }
  });
};

/**
 *  Get User channels
 */

export const getUserChannels = async () => {
  const { user_id = "fidabhittani", login = "fidabhittani" } = getUser();
  return await request({
    loadingText: `Getting ${login} Channels...`,
    apiOptions: {
      method: "get",
      url: `${twitchServiceAuth}/users/${user_id}/follows/channels`,
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": clientCredentials.clientId
      }
    }
  });
};

/**
 *  Get search Channels . Free text search
 */

export const searchChannels = async payLoad => {
  const stringifiedPayload = queryString.stringify(payLoad);

  return await request({
    loadingText: `Getting Channels...`,
    apiOptions: {
      method: "get",
      url: `${twitchServiceAuth}/search/channels?${stringifiedPayload}`,
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": clientCredentials.clientId
      }
    }
  });
};
