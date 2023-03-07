const _update = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.update(info);

      const userData = {
        id: data.get_id(),
        ...(data.get_email() ? { email: data.get_email() } : {}),
        ...(data.get_name() ? { name: data.get_name() } : {}),
        ...(data.get_anwser() ? { anwser: data.get_anwser() } : {}),
        ...(data.get_securityQuestion()
          ? { securityQuestion: data.get_securityQuestion() }
          : {}),
      };

      console.log("🚀 ~ file: update.js:15 ~ return ~ userData:", userData);

      const result = await dataAccess.update(userData);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      throw new Error(error);
    }
  };
};

module.exports = _update;
