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

const _updateTransactionBalanceETH = () => {
  return (info) => {
    const { address, balance } = info;
    return new Promise((resolve, reject) => {
      Account.findOneAndUpdate(
        { wallet_address: address },
        { t_account_ETH: balance }
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

module.exports = { _updateSavingBalanceETH, _updateTransactionBalanceETH };
