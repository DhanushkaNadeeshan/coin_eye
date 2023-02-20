const Account = require("../models/Account");

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

module.exports = { updateCryptoAccount };
