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
      console.log("🚀 ~ file: loginWithGoogle.js:21 ~ return ~ error.message:", error.message)
      if(error.message==='Error: unavailable'){
        res.status(404).json({status:"unavailable", msg: "User not unavailable!" });
      }else{
        res.status(500).json({status:"error", msg: "error login" });
      }
      
    }
  };
};

module.exports = _loginWithGoogle;
