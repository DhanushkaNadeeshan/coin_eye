const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { findUser } = require("../../controllers/user");
const { createToken } = require("../../util/jwt");

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

router.post("/google", async (req, res) => {
  const verificationResponse = await verifyGoogleToken(req.body.credential);

  if (verificationResponse.error) {
    return res.status(400).json({
      message: verificationResponse.error,
    });
  }

  const profile = verificationResponse?.payload;
  try {
    const foundUser = await findUser({ email: profile.email });

    if (foundUser) {
      const user = {
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
      };
      const token = createToken(user);
      res.cookie("key", token, { maxAge: 900000 });
      res.status(201).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
