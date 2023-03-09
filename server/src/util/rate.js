const axios = require("axios");

const getRate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        console.log("🚀 ~ file: rate.js:11 ~ returnnewPromise ~ error:", error);
        reject(error);
      });
  });
};

// const getReduceNumber = (currentAmount, amount) => {
//   let [int, dec] = `${amount}`.split(".");

//   let numberOfDecimal = dec.length - 2;

//   amount = [...int, ...dec];
//   amount = amount.join("");
//   amount = parseInt(amount);

//   currentAmount = currentAmount * numberOfDecimal;

//   return currentAmount - amount;
// };
module.exports = { getRate };
