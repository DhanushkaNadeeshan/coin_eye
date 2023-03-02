const _make = ({ User, Account, newWallet }) => {
  return function _make(info) {
    return new Promise((resolve, reject) => {
      try {
        User.create(info, (err, createUserResult) => {
          if (err) return reject(err);
          // TODO: error handling
          // TODO: test the code
          // TODO: if transaction fail rollback the process
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
            // resolve(createUserResult);
          } else {
            reject("id isn't available");
          }
        });
      } catch (error) {
        console.log("🚀 ~ file: make.js:36 ~ returnnewPromise ~ error:", error);
        reject(error);
      }
    });
  };
};

module.exports = _make;
