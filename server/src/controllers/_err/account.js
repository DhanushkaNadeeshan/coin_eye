const Account = require("../../data-access/models/Account");

function updateCryptoAccount(address, balanceFromDb, balanceFromNetwork) {
  balanceFromDb = parseFloat(balanceFromDb);
  balanceFromNetwork = parseFloat(balanceFromNetwork);

  if (balanceFromNetwork != 0) {
    if (balanceFromNetwork != balanceFromDb) {
      Account.findByIdAndUpdate(
        { wallet_address: address },
        { total_ETH: balanceFromNetwork }
      )
        .then((rs) => {
          console.log(
            "🚀 ~ file: account.js:10 ~ Account.findByIdAndUpdate ~ rs",
            rs
          );
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: account.js:12 ~ Account.findByIdAndUpdate ~ error",
            error
          );
        });
    }
  }
}

function updateETH(address, balance) {
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
}

function getETHBlance(address) {
  return new Promise((resolve, reject) => {
    Account.findOne({ wallet_address: address })
      .then((rs) => {
        resolve(rs);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllWalletAddress() {
  return new Promise((resolve, reject) => {
    Account.find({}, "wallet_address")
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  updateCryptoAccount,
  updateETH,
  getETHBlance,
  getAllWalletAddress,
};
