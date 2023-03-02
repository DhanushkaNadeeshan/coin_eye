const _make = ({ Transaction }) => {
  return (info) => {
    return new Promise((resolve, reject) => {
      Transaction.create(info)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _make;
