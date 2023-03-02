const select = (usecaseSelect) => {
  return async function get(req, res) {
    try {
      const data = req.body;
      const result = await usecaseSelect(data);
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = select;
const _update = (usecaseUpdate) => {
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

module.exports = _update;
