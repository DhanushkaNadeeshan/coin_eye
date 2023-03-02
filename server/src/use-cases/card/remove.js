const _remove = ({ dataAccess, etities }) => {
  return async (info) => {
    try {
      const data = etities.view(info);
      const id = data.get_id();
      return await dataAccess.remove({ id });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);

      return { msg: "come from error" };
    }
  };
};

module.exports = _remove;
