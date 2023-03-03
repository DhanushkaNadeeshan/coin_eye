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
  return ({ address, amount, status }) => {
    if (!address) {
      throw new Error("Please insert address");
    }

    if (!amount) {
      throw new Error("Please insert balance");
    }

    if (!status) {
      throw new Error("Please insert status");
    }

    return Object.freeze({
      get_walletAddress: () => address,
      get_amount: () => amount,
      get_status: () => status,
    });
  };
};

module.exports = { _updateSavingBalanceETH, _updateTransactionBalanceETH };
