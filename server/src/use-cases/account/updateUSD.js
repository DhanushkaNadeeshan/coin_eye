const _updateSavingBalanceUSD = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateSavingBalanceUSD(info);

      const balanceInfo = {
        id: data.get_id(),
        balance: data.get_balance(),
      };

      const result = await dataAccess.updateSavingBalanceUSD(balanceInfo);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

const _updateTransactionBalanceUSD = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateTransactionBalanceUSD(info);

      const balanceInfo = {
        id: data.get_id(),
        balance: data.get_balance(),
      };

      const result = await dataAccess.updateTransactionBalanceUSD(balanceInfo);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

module.exports = {
  _updateSavingBalanceUSD,
  _updateTransactionBalanceUSD,
};
