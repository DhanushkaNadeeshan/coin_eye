const _viewETH = (usecaseSelect, dataEncryption) => {
  return async (req, res) => {
    try {
      const address = req.params.address;

      let result = await usecaseSelect({ address });
      result = dataEncryption(req.key, result);
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _viewETH;
