const _recoveryETH = ({ dataAccess, entities, wallet }) => {
  return async (info) => {
    try {
      const data = entities.recoveryETH(info);

      const oldWalletAddress = data.get_walletAddress();

      // create new account
      const acountInfo = wallet.newWallet();
      console.log("new account", acountInfo);
      // send all coin to new account
      const result = await dataAccess.recoveryETH(acountInfo, oldWalletAddress);

      return result;
    } catch (error) {
      console.log("🚀 ~ file: update.js:17 ~ return ~ error:", error);
      throw new Error(error);
    }
  };
};

module.exports = {
  _recoveryETH,
};
