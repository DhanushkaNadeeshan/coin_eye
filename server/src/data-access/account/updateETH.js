const _updateSavingBalanceETH = ({ Account }) => {
  return (info) => {
    const { address, balance } = info;
    return new Promise((resolve, reject) => {
      Account.findOneAndUpdate(
        { wallet_address: address },
        { total_ETH: balance }
      )
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

const _updateTransactionBalanceETH = ({ Account }) => {
  return (info) => {
    const { address, amount, status } = info;
    return new Promise(async (resolve, reject) => {
      try {
        const account = await Account.findOne({ wallet_address: address });

        let { t_account_ETH } = account;

        if (status === "add") {
          account.t_account_ETH = t_account_ETH + amount;
        } else if (status === "remove") {
          account.t_account_ETH = t_account_ETH - amount;
        } else {
          return reject("Unwanted data is passed at status");
        }

        let rs = await account.save();

        resolve({
          totalETH: account.total_ETH,
          transactionETHBalance: account.t_account_ETH,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _updateSavingBalanceETH, _updateTransactionBalanceETH };
