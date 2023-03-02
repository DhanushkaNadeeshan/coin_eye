const _viewETH = () => {
  // id: user id
  return ({ walletAddress }) => {
    if (!id) {
      throw new Error("Please insert address");
    }

    return Object.freeze({
      get_walletAddress: () => walletAddress,
    });
  };
};

module.exports = _viewETH;
