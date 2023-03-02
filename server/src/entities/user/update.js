const _update = () => {
  return function _update({ id, name, email, securityQuestion, anwser }) {
    if (!email) {
      throw new Error("Please insert mail");
    }

    if (!id) {
      throw new Error("Please insert mail");
    }

    return Object.freeze({
      get_id: () => id,
      get_email: () => email,
      get_name: () => name,
      get_securityQuestion: () => securityQuestion,
      get_anwser: () => anwser,
    });
  };
};

module.exports = _update;
