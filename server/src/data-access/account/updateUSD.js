const _updateSavingBalanceUSD = ({ User }) => {
  return ({ id, balance }) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ _id: id }, { total_USD: balance })
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

const _updateTransactionBalanceUSD = ({ User }) => {
  return ({ id, balance }) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ _id: id }, { t_account_USD: balance })
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = { _updateSavingBalanceUSD, _updateTransactionBalanceUSD };
