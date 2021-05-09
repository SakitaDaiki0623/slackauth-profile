import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { oauthAccess } from "./slack";
import { URL } from "url";

admin.initializeApp({
  serviceAccountId: "slackauth-prof@appspot.gserviceaccount.com",
  credential: admin.credential.applicationDefault(),
});

exports.authWithSlack = functions.https.onRequest(async (req, res) => {
  const slackAuthCode = req.query.code as string;
  const redirectUri = req.query.state as string | undefined;

  if (!slackAuthCode) {
    console.warn("code query string not find.");
    res.status(400).end();
  }

  const userCredential = await oauthAccess(slackAuthCode);

  try {
    const customToken = await admin
      .auth()
      .createCustomToken(userCredential.authed_user.id);

    if (redirectUri) {
      const url = new URL(redirectUri);
      url.search = `t=${customToken}`;
      res.redirect(303, url.toString());
    } else {
      res
        .json({
          custom_token: customToken,
        })
        .end();
    }
    return;
  } catch (e) {
    console.error("Failed to create custom token:", e);
  }
});
