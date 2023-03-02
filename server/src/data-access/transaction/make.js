const _make = ({ Transaction, sendAlert }) => {
  return (info) => {
    return new Promise((resolve, reject) => {
      Transaction.create(info)
        .then((result) => {
          sendAlert(info.to, "update.balance.ETH");
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _make;
