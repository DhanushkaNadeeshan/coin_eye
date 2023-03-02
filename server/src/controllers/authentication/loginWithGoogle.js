const _loginWithGoogle = (verifyGoogleToken, login) => {
  return async (req, res) => {
    try {
      const { credential } = req.body;
      const verificationResponse = await verifyGoogleToken(credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }
      const profile = verificationResponse.payload;

      const { email, picture } = profile;

      const result = await login({ email, picture });
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _loginWithGoogle;
