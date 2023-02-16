const User = require("../models/User");
const Account = require("../models/Account");
const { newWallet } = require("../util/wallet");
var mongoose = require("mongoose");

function getUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.find({});
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function findUser(params) {
  return new Promise(async (resolve, reject) => {
    try {
      User.aggregate([
        {
          $match: {
            ...params,
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "_id",
            foreignField: "ref_user",
            pipeline: [
              {
                $project: {
                  wallet_address: 1,
                  cards: 1,
                  s_account_ETH: 1,
                  s_account_USD: 1,
                  t_account_ETH: 1,
                  t_account_USD: 1,
                },
              },
            ],
            as: "account",
          },
        },
      ]).exec((err, data) => {
        console.log("🚀 ~ file: user.js:35 ~ ]).exec ~ data", data);
        if (err) reject(err);
        resolve(data);
      });
    } catch (error) {
      console.log("🚀 ~ file: user.js:24 ~ returnnewPromise ~ error", error);
      reject(error);
    }
  });
}

function createUser(userData) {
  return new Promise((resolve, reject) => {
    User.create(userData, (err, createUserResult) => {
      if (err) reject(err);
      // TODO: error handling
      //create wallet in etherum blockchain network
      const { privateKey, address } = newWallet();

      const newAccount = {
        wallet_address: address,
        private_key: privateKey,
        ref_user: createUserResult._id,
      };

      // create account in data base
      Account.create(newAccount, (err, createAccountResult) => {
        if (err) reject(err);

        const returnObject = {
          ...createAccountResult,
          wallet_address: createAccountResult.wallet_address,
          t_account_ETH: createAccountResult.t_account_ETH,
          s_account_ETH: createAccountResult.s_account_ETH,
          t_account_USD: createAccountResult.t_account_USD,
          s_account_USD: createAccountResult.s_account_USD,
          cards: createAccountResult.cards,
        };
        resolve(returnObject);
      });
    });
  });
}

module.exports = {
  getUsers,
  createUser,
  findUser,
};
