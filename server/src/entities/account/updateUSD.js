const _updateSavingBalanceUSD = () => {
  return ({ id, balance }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!balance) {
      throw new Error("Please insert balance");
    }

    return Object.freeze({
      get_id: () => id,
      get_balance: () => balance,
    });
  };
};

const _updateTransactionBalanceUSD = () => {
  return ({ id, balance }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!balance) {
      throw new Error("Please insert balance");
    }

    return Object.freeze({
      get_id: () => id,
      get_balance: () => balance,
    });
  };
};

module.exports = { _updateSavingBalanceUSD, _updateTransactionBalanceUSD };
