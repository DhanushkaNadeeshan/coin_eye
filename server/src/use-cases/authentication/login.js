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
      

      const { account, ...infoUser } = result;

      // google picture
      infoUser.picture = data.get_picture();

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


    
      return { ...infoUser, accountInfo };



    } catch (error) {
      throw new Error(error);
    }
  };
};

module.exports = _login;
