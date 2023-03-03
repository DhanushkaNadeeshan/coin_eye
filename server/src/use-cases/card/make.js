const _make = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.make(info);

      const card = {
        id: data.get_id(),
        number: data.get_number(),
        cvc: data.get_cvc(),
        expiryYear: data.get_expiryYear(),
        expiryMonth: data.get_expiryMonth(),
      };

      const result = await dataAccess.make(card);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: make.js:16 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

module.exports = _make;
