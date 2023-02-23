const Transaction = require("../models/Transaction");

function create(data) {
  return new Promise((resolve, reject) => {
    Transaction.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getTransactions(address) {
  return new Promise((resolve, reject) => {
    Transaction.find({ $or: [{ to: address }, { from: address }] })
      .then((rs) => {
        resolve(rs);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { create , getTransactions };
