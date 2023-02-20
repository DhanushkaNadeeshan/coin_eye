const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { findUser } = require("../../controllers/user");
const { createToken } = require("../../util/jwt");
const { getBalance } = require("../../util/wallet");
const { updateCryptoAccount } = require("../../controllers/account");
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

const loginTrack = (req, res, next) => {
  console.log("TODO:login track");
  next();
};

router.use(loginTrack);

router.post("/google", async (req, res) => {
  const verificationResponse = await verifyGoogleToken(req.body.credential);

  if (verificationResponse.error) {
    return res.status(400).json({
      message: verificationResponse.error,
    });
  }

  const profile = verificationResponse?.payload;

  try {
    // finding user
    let foundUser = await findUser({ email: profile.email });

    if (foundUser.length > 0) {
      foundUser = foundUser[0];
      // remove unwanted property
      delete foundUser.anwser;
      delete foundUser.securityQuestion;
      // assing google profile picture
      foundUser.picture = profile?.picture;
      // get wallet address from database data
      const { wallet_address, total_ETH } = foundUser.account[0];
      // get balance from etheriume
      const balance = await getBalance(wallet_address);
      // check etheriume network balance whether it's updated
      updateCryptoAccount(wallet_address, total_ETH.$numberDecimal, balance);
      // update etherum balance with actual balance
      foundUser.account[0].total_ETH.$numberDecimal = balance;

      const token = createToken({ email: foundUser.email });

      res.cookie("key", token, { maxAge: 900000 });
      res.status(200).json({
        success: true,
        user: foundUser,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "user not founded",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
