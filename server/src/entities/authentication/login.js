const _login = () => {
  return ({ email, picture }) => {
    if (!email) {
      throw new Error("Please insert credentail");
    }

    return Object.freeze({
      get_email: () => email,
      get_picture: () => picture,
    });
  };
};

module.exports = _login;
