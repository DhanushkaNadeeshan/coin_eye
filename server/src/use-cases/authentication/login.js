const _login = ({
  dataAccess,
  entities,
  getETHBalance,
  updateSavingBalanceETH,
}) => {
  return async (info) => {
    try {
      const data = entities.login(info);

      const email = data.get_email();

      const result = await dataAccess.login({ email });

      if (result.length > 0) {
        const user = result[0];
        const { account, ...info } = user;
        // remove unwanted property
        delete info.anwser;
        delete info.securityQuestion;
        // google picture
        info.picture = data.picture();

        let accountInfo = account[0];
        // get balance from etheriume
        const balance = await getETHBalance(accountInfo.wallet_address);
        // assing balance
        accountInfo.total_ETH = balance;
        if (balance) {
          updateSavingBalanceETH({
            address: accountInfo.wallet_address,
            balance,
          });
        }

        return { ...info, accountInfo };
      } else {
        throw new Error("User can't find");
      }
    } catch (error) {
      console.log("🚀 ~ file: login.js:13 ~ return ~ error:", error);
      return { msg: "user login faild" };
    }
  };
};

module.exports = _login;
