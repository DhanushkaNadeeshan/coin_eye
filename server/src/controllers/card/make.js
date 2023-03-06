const _make = (usecaseMake) => {
  return async (req, res) => {
    try {
      const body = req.body;
      console.log("🚀 ~ file: make.js:5 ~ return ~ body:", body)
      const result = await usecaseMake(body);
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _make;
