const _updateSavingBalanceUSD = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateSavingBalanceUSD(info);

      const balanceInfo = {
        id: data.get_id(),
        amount: data.get_amount(),
        number: data.get_number(),
      };

      const result = await dataAccess.updateSavingBalanceUSD(balanceInfo);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      throw new Error("used geting error");
    }
  };
};

const _updateTransactionBalanceUSD = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateTransactionBalanceUSD(info);

      const balanceInfo = {
        id: data.get_id(),
        amount: data.get_amount(),
      };

      const result = await dataAccess.updateTransactionBalanceUSD(balanceInfo);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      throw new Error("_updateTransactionBalanceUSD");
    }
  };
};

module.exports = {
  _updateSavingBalanceUSD,
  _updateTransactionBalanceUSD,
};
