const _updateReadStatus = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateReadStatus(info);

      const jsonObject = {
        id: data.get_id(),
        read: data.get_read(),
      };

      return await dataAccess.updateReadStatus(jsonObject);
    } catch (error) {
      throw new Error(error);
    }
  };
};

module.exports = { _updateReadStatus };
