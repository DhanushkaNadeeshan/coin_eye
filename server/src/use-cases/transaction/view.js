const _view = ({ dataAccess, etities }) => {
  return async (info) => {
    try {
      const data = etities.view(info);
      const address = data.get_address();
      return await dataAccess.view({ address });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);

      return { msg: "come from error" };
    }
  };
};

module.exports = _view;
