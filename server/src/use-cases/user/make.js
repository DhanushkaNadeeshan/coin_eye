const _make = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.make(info);

      const userData = {
        email: data.get_email(),
        name: data.get_name(),
        securityQuestion: data.get_securityQuestion(),
        anwser: data.get_anwser(),
      };

      const result = await dataAccess.make(userData);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: make.js:16 ~ return ~ error:", error);
      throw new Error("Creating is fail");
    }
  };
};

module.exports = _make;
