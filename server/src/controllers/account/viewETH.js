const _viewETH = (usecaseSelect) => {
  return async (req, res) => {
    try {
      const address = req.params.address;
      const result = await usecaseSelect({ address });
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _viewETH;
