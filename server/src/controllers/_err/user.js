const User = require("../data-access/models/User");
const Account = require("../data-access/models/Account");
const { newWallet } = require("../util/wallet");

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
                  s_account_ETH: 1,
                  t_account_ETH: 1,
                  total_ETH: 1,
                },
              },
            ],
            as: "account",
          },
        },
      ]).exec((err, data) => {
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
    try {
      User.create(userData, (err, createUserResult) => {
        if (err) return reject(err);
        // TODO: error handling
        // TODO: test the code
        // create wallet in etherum blockchain network
        if (createUserResult._id) {
          const { privateKey, address } = newWallet();

          console.log("address-------", address);

          const newAccount = {
            wallet_address: address,
            private_key: privateKey,
            ref_user: createUserResult._id,
          };

          // create account in data base
          Account.create(newAccount, (err, createAccountResult) => {
            if (err) return reject(err);

            const returnObject = {
              ...createAccountResult,
              wallet_address: createAccountResult.wallet_address,
            };
            resolve(returnObject);
          });
        } else {
          reject("id isn't available");
        }
      });
    } catch (error) {
      console.log("🚀 ~ file: user.js:82 ~ returnnewPromise ~ error", error);
      reject(error);
    }
  });
}

module.exports = {
  getUsers,
  createUser,
  findUser,
};
