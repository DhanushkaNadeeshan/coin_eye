const _updateSavingBalanceUSD = ({ User, stripe }) => {
  return ({ id, amount, number }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ _id: id });

        if (!user) {
          return reject("can not find user");
        }

        const cardInfo = user.cards.find((data) => data.number === number);

        if (!cardInfo) {
          return reject("can not find card");
        }

        const paymentMethod = await stripe.paymentMethods.create({
          type: "card",
          card: {
            number: cardInfo.number,
            exp_month: cardInfo.expiryMonth,
            exp_year: cardInfo.expiryYear,
            cvc: cardInfo.cvc,
          },
        });

        const { amount_received, status } = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method: paymentMethod.id,
          confirm: true,
        });
        if (status !== "succeeded") {
          return reject("faild transaction");
        }

        let { total_USD } = user;
        user.total_USD = total_USD + amount_received;

        let rs = await user.save();

        resolve({
          totalUSD: user.total_USD,
          transactionAccountUSD: user.t_account_USD,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
};

const _updateTransactionBalanceUSD = ({ User }) => {
  return ({ id, amount, status }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: id });
        let { t_account_USD } = user;
        if (status === "add") {
          user.t_account_USD = t_account_USD + amount;
        } else {
          user.t_account_USD = t_account_USD - amount;
        }
        let rs = await user.save();
        resolve({
          totalUSD: user.total_USD,
          transactionUSDBalance: user.t_account_USD,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _updateSavingBalanceUSD, _updateTransactionBalanceUSD };
