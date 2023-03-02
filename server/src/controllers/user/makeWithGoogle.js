const _makeWithGoogle = (verifyGoogleToken, usecaseMake) => {
  return async (req, res) => {
    try {
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

      const result = await usecaseMake(user);
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _makeWithGoogle;
