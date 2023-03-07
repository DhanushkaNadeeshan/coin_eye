const _question = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.question(info);

      const jsonObj = {
        id: data.get_id(),
        securityQuestion: data.get_securityQuestion(),
        anwser: data.get_anwser(),
      };

      return await dataAccess.question(jsonObj);
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);
      throw new Error(error);
    }
  };
};

const _recovery = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.recovery(info);

      const jsonObj = {
        id: data.get_id(),
        securityQuestion: data.get_securityQuestion(),
      };

      return await dataAccess.recovery(jsonObj);
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);
      throw new Error(error);
    }
  };
};

const _getRecoveryQuestion = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.getRecoveryQuestion(info);

      const jsonObj = {
        id: data.get_id(),
      };

      return await dataAccess.getRecoveryQuestion(jsonObj);
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);
      throw new Error(error);
    }
  };
};

module.exports = { _question, _recovery, _getRecoveryQuestion };
