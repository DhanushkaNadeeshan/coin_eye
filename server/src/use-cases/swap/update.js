const _update = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.update(info);

      const jsonObject = {
        id: data.get_id(),
        status: data.get_status(),
      };

      return await dataAccess.update(jsonObject);
    } catch (error) {
      throw new Error(error);
    }
  };
};

module.exports = { _update };
