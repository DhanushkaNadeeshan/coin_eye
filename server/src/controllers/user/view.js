const _view = (usecaseSelect) => {
  return async function get(req, res) {
    try {
      const id = req.params.id;
      const result = await usecaseSelect({ id });
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = _view;
