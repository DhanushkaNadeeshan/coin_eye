const _update = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.update(info);

      const card = {
        id: data.get_id(),
        number: data.get_number(),
        cvc: data.get_cvc(),
        expiryYear: data.get_expiryYear(),
        expiryMonth: data.get_expiryMonth(),
      };

      const result = await dataAccess.update(card);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

module.exports = _update;
