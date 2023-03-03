const _viewETH = () => {
  // id: user id
  return ({ address }) => {
    if (!address) {
      throw new Error("Please insert address");
    }

    return Object.freeze({
      get_walletAddress: () => address,
    });
  };
};

module.exports = _viewETH;
