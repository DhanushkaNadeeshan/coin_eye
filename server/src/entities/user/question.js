const _question = () => {
  return ({ id, securityQuestion, anwser }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!securityQuestion) {
      throw new Error("Please insert question");
    }

    if (!anwser) {
      throw new Error("Please insert anwser");
    }
    return Object.freeze({
      get_id: () => id,
      get_securityQuestion: () => securityQuestion,
      get_anwser: () => anwser,
    });
  };
};

const _recovery = () => {
  return ({ id, securityQuestion }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!securityQuestion) {
      throw new Error("Please insert question");
    }
    return Object.freeze({
      get_id: () => id,
      get_securityQuestion: () => securityQuestion,
    });
  };
};

const _getRecoveryQuestion = () => {
  return ({ id }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    return Object.freeze({
      get_id: () => id,
    });
  };
};

module.exports = { _question, _recovery, _getRecoveryQuestion };
