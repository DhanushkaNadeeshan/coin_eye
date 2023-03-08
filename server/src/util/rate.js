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

module.exports = { getRate };
