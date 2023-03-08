const _view = () => {
  // id: user id
  return ({ address }) => {
    if (!address) {
      throw new Error("Please insert address");
    }

    return Object.freeze({
      get_address: () => address,
    });
  };
};

module.exports = { _view };
