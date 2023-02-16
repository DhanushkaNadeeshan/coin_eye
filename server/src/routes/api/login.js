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

    if (foundUser.length > 0) {
      const user = {
        picture: profile?.picture,
        name: foundUser[0].name,
        email: foundUser[0].email,
        account_details: foundUser[0].account,
      };
      const token = createToken({ email: user.email });
      res.cookie("key", token, { maxAge: 900000 });
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
