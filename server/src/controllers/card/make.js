const _make = (usecaseMake, dataDecryption, dataEncryption) => {
  return async (req, res) => {
    try {
      let body = req.body;

      body = dataDecryption(req.key, body.encrptedData);

      if (!body) {
        return res.status(400).json({ msg: "can't decrypting data" });
      }
      
      let result = await usecaseMake(body);

      result = dataEncryption(req.key, result);

      res.json({ success: true, result });
    } catch (error) {
      console.log("🚀 ~ file: make.js:10 ~ return ~ error:", error);
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _make;
