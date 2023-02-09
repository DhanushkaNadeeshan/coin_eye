const express = require("express");
const { verifyGoogleToken } = require("../../util/google");
const { createToken } = require("../../util/jwt");
const { createUser } = require("../../controllers/user");


const router = express.Router();

router.post("/google", async (req, res) => {
  const { credential, securityQuestion, anwser } = req.body;

  const verificationResponse = await verifyGoogleToken(credential);

  if (verificationResponse.error) {
    return res.status(400).json({
      message: verificationResponse.error,
    });
  }

  const profile = verificationResponse?.payload;

  const user = {
    name: profile?.name,
    securityQuestion: securityQuestion,
    email: profile?.email,
    anwser: anwser,
  };

  try {
    // create user
    const newUser = await createUser(user);
    const token = createToken(user);
    // create wallet
    res.cookie("key", token, { maxAge: 900000 });
    res.status(201).json({
      success: true,
      result: newUser,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
