const _view = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.view(info);
      const address = data.get_address();
      return await dataAccess.view({ address });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);

      return { msg: "come from error" };
    }
  };
};

module.exports = _view;
