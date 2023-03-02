const _updateSavingBalanceETH = () => {
  return ({ walletAddress, balance }) => {
    if (!walletAddress) {
      throw new Error("Please insert id");
    }

    if (!balance) {
      throw new Error("Please insert balance");
    }

    return Object.freeze({
      get_walletAddress: () => walletAddress,
      get_balance: () => balance,
    });
  };
};

const _updateTransactionBalanceETH = () => {
  return ({ walletAddress, balance }) => {
    if (!walletAddress) {
      throw new Error("Please insert id");
    }

    if (!balance) {
      throw new Error("Please insert balance");
    }

    return Object.freeze({
      get_walletAddress: () => walletAddress,
      get_balance: () => balance,
    });
  };
};

module.exports = { _updateSavingBalanceETH, _updateTransactionBalanceETH };
