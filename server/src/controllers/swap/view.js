const _view = (usecaseView) => {
  return async function get(req, res) {
    try {
      const address = req.params.address;
      const result = await usecaseView({ address });
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = { _view };
