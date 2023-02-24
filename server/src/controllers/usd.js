const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function newCard(info) {
  return new Promise(async (resolve, reject) => {
    const { email, ...cardInfo } = info;

    User.findOne({ email })
      .then((user) => {
        const existingCard = user.cards.find((card) => {
          return card.number == cardInfo.number;
        });

        if (existingCard) {
          reject("card is exixt");
        } else {
          user.cards.push(cardInfo);
          user
            .save()
            .then((rs) => {
              resolve(rs);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getUSD(info) {
  return new Promise(async (resolve, reject) => {
    const { number, amount, email } = info;

    try {
      let user = await User.findOne({ email });

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

      resolve({ totalUSD: user.total_USD });
    } catch (error) {
      reject(error);
    }
  });
}


module.exports = { newCard, getUSD };
