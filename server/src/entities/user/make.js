const _make = () => {
  return function _make({ name, email, securityQuestion, anwser }) {
    if (!email) {
      throw new Error("Please insert mail");
    }

    return Object.freeze({
      get_email: () => email,
      get_name: () => name,
      get_securityQuestion: () => securityQuestion,
      get_anwser: () => anwser,
    });
  };
};

module.exports = _make;
