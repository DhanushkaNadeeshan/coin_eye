const _updateSavingBalanceUSD = () => {
  return ({ id, amount, number }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!amount) {
      throw new Error("Please insert balance");
    }

    return Object.freeze({
      get_id: () => id,
      get_amount: () => amount,
      get_number: () => number,
    });
  };
};

const _updateTransactionBalanceUSD = () => {
  return ({ id, amount }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!amount) {
      throw new Error("Please insert balance");
    }

    return Object.freeze({
      get_id: () => id,
      get_amount: () => amount,
    });
  };
};

module.exports = { _updateSavingBalanceUSD, _updateTransactionBalanceUSD };
