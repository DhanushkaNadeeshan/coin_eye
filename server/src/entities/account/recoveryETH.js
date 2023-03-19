const _recoveryETH = () => {
  return ({ address }) => {
    if (!address) {
      throw new Error("Please insert wallet address");
    }

    return Object.freeze({
      get_walletAddress: () => address,
    });
  };
};

module.exports = { _recoveryETH };
