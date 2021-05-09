import * as functions from "firebase-functions";
import axios from "axios";
import * as qs from "querystring";

const slackClient = axios.create({
  baseURL: "https://slack.com/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [(data) => qs.stringify(data)],
});

export type oauthAccessResponseType = {
  userId: string;
  accessToken: string;
  scope: string;
  teamName: string;
  teamId: string;
};
export const oauthAccess = async (
    code: string
): Promise<oauthAccessResponseType> => {
  const requestArgs = {
    client_id: functions.config().slack.client_id,
    client_secret: functions.config().slack.client_secret,
    code,
  };

  try {
    const res = await slackClient.post<oauthAccessResponseType>(
        "oauth.v2.access",
        requestArgs
    );
    return res.data;
  } catch (e) {
    console.warn("Slack oauth was failed.", e);
    throw new Error();
  }
};

export type SlackUserType = {
  id: string;
  teamId: string;
  name: string;
  realName: string;
  isAdmin: boolean;
  isOwner: boolean;
  isPrimaryOwner: boolean;
  isRestricted: boolean;
  isUltraRestricted: boolean;
};
export const usersInfo = async (
    token: string,
    userId: string
): Promise<SlackUserType> => {
  const requestArgs = {
    token,
    user_id: userId,
  };

  try {
    const res = await slackClient.post<{ user: SlackUserType }>(
        "users.info",
        requestArgs
    );
    return res.data.user;
  } catch (e) {
    console.warn("Slack oauth was failed.", e);
    throw new Error();
  }
};
