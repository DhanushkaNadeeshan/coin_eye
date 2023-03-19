const _recoveryETH = ({ Account, wallet, sendAlert }) => {
  return (accountInfo, oldWalletAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        // get data old data
        const oldAccountInfo = await Account.findOne({
          wallet_address: oldWalletAddress,
        });

        const newAccount = {
          wallet_address: accountInfo.address,
          private_key: accountInfo.privateKey,
          ref_user: oldAccountInfo.ref_user,
        };

        // make TX
        const reslut = await wallet.sendAllETH(
          oldAccountInfo.private_key,
          accountInfo.address,
          () => {
            Account.create(newAccount)
              .then(() => {
                oldAccountInfo.active = false;
                oldAccountInfo.save();
                sendAlert(oldWalletAddress, `recovery.ETH.success`);
              })
              .catch((error) => {
                sendAlert(oldWalletAddress, `recovery.ETH.fail`);
                console.log(
                  "🚀 ~ file: recoveryETH.js:26 ~ Account.crete ~ error:",
                  error
                );
              });
          }
        );

        resolve(reslut);

        // save data
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _recoveryETH };
