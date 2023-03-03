const _updateSavingBalanceETH = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateSavingBalanceETH(info);

      const card = {
        address: data.get_walletAddress(),
        balance: data.get_balance(),
      };

      const result = await dataAccess.updateSavingBalanceETH(card);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

const _updateTransactionBalanceETH = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateTransactionBalanceETH(info);

      const card = {
        address: data.get_walletAddress(),
        amount: data.get_amount(),
        status: data.get_status(),
      };

      const result = await dataAccess.updateTransactionBalanceETH(card);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

module.exports = {
  _updateTransactionBalanceETH,
  _updateSavingBalanceETH,
};
