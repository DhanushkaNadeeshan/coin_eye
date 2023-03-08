const _requestETH = ({ User, Swap, sendAlert }) => {
  return (info) => {
    const { amount, USDRate, ...swapObj } = info;

    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ _id: swapObj.senderId });

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

        sendAlert(swapObj.receiverAddress, "request.balance.ETH");

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _requestETH };
