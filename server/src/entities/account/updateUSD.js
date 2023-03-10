const _updateSavingBalanceUSD = () => {
  return ({ id, amount, number }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!amount) {
      throw new Error("Please insert amount");
    }

    if (!number) {
      throw new Error("Please insert number");
    }

    return Object.freeze({
      get_id: () => id,
      get_amount: () => amount,
      get_number: () => number,
    });
  };
};

const _updateTransactionBalanceUSD = () => {
  return ({ id, amount, status }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!amount) {
      throw new Error("Please insert balance");
    }

    if (!status) {
      throw new Error("Please insert status");
    }
    return Object.freeze({
      get_id: () => id,
      get_amount: () => amount,
      get_status: () => status,
    });
  };
};

module.exports = { _updateSavingBalanceUSD, _updateTransactionBalanceUSD };
