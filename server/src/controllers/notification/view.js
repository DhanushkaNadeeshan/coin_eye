const _view = (usecase) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const result = await usecase({ refUser: id });
      res.json({ success: true, result });
    } catch (error) {
      console.log("🚀 ~ file: requestETH.js:8 ~ return ~ error:", error);
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = { _view };
