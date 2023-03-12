const _requestETH = ({
  User,
  Swap,
  sendAlert,
  dataAccessNotification,
  Account,
}) => {
  return (info) => {
    const { amount, USDRate, ...swapObj } = info;

    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ _id: swapObj.senderId });

        if (!user) {
          return reject("sender can't find");
        }

        let receiveUser = await Account.findOne({
          wallet_address: swapObj.receiverAddress,
        });

        if (!receiveUser) {
          return reject("requested user can't find");
        }
        //   calculate usd value of requested ETH amount
        let usdValueOfETH = amount * USDRate;
        usdValueOfETH = usdValueOfETH.toFixed(2);

        if (usdValueOfETH > user.t_account_USD) {
          return reject("requested amount grater than transaction");
        }

        user.total_USD = user.total_USD - usdValueOfETH * 100;
        user.t_account_USD = user.t_account_USD - usdValueOfETH * 100;

        swapObj.ETHValue = amount;
        swapObj.USDValue = usdValueOfETH;

        const result = await Swap.create(swapObj);

        await user.save();

        // create log informations
        const notificationSender = {
          type: "swap",
          description: `request ${swapObj.ETHValue} (ETH) to ${swapObj.receiverAddress}`,
          refUser: swapObj.senderId,
          ref: [
            {
              id: result._id,
              document: "swaps",
            },
          ],
        };

        dataAccessNotification.make(notificationSender);

        const notificationReceiver = {
          address: swapObj.receiverAddress,
          type: "swap",
          description: `request ${swapObj.ETHValue} (ETH) from ${swapObj.senderAddress}`,
          ref: [
            {
              id: result._id,
              document: "swaps",
            },
          ],
        };

        dataAccessNotification.findByAddressAndMake(notificationReceiver);

        sendAlert(swapObj.receiverAddress, "swap.request.balance.ETH");

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _requestETH };
