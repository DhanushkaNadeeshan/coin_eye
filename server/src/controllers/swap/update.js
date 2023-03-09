const _update = (usecaseUpdate) => {
  return async (req, res) => {
    try {
      const body = req.body;
      const result = await usecaseUpdate(body);
      res.json({ success: true, result });
    } catch (error) {
      console.log("🚀 ~ file: requestETH.js:8 ~ return ~ error:", error);
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = { _update };
