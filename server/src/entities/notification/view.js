const _view = () => {
  // id: user id
  return ({ refUser }) => {
    if (!refUser) {
      throw new Error("Please insert refUser");
    }

    return Object.freeze({
      get_refUser: () => refUser,
    });
  };
};

module.exports = { _view };
