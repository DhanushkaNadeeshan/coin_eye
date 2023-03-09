const _view = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.view(info);
      const refUser = data.get_refUser();
      return await dataAccess.view({ refUser });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);
      throw new Error(error);
    }
  };
};

module.exports = { _view };
