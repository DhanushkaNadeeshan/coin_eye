const _remove = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.remove(info);
      const id = data.get_id();
      const userId = data.get_userId();
      return await dataAccess.remove({ id, userId });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);

      throw new Error(error);
    }
  };
};

module.exports = _remove;
