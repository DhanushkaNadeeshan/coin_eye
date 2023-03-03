const _view = () => {
  return function _view({ address }) {
    if (!address) {
      throw new Error("Please insert address");
    }

    return Object.freeze({
      get_address: () => address,
    });
  };
};

module.exports = _view;
