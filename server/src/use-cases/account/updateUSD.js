const _updateSavingBalanceUSD = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.updateSavingBalanceUSD(info);

      const card = {
        wallet_address: data.get_walletAddress(),
        get_balance: data.get_balance(),
      };

      const result = await dataAccess.updateSavingBalanceUSD(card);
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

      const card = {
        wallet_address: data.get_walletAddress(),
        get_balance: data.get_balance(),
      };

      const result = await dataAccess.updateTransactionBalanceUSD(card);
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
