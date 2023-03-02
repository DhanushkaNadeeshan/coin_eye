const _update = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.update(info);

      const userData = {
        id: data.id(),
        email: data.get_email(),
        name: data.get_name(),
        securityQuestion: data.get_securityQuestion(),
        anwser: data.anwser(),
      };

      const result = await dataAccess.update(userData);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error)
      return { msg: "user creation faild" };
    }
  };
};

module.exports = _update;
