const _updateTransactionBalanceETH = (usecaseUpdate) => {
  return async (req, res) => {
    try {
      const body = req.body;
      const result = await usecaseUpdate(body);
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _updateTransactionBalanceETH;
