const _view = ({ Transaction }) => {
  return ({ address }) => {
    return new Promise((resolve, reject) => {
      Transaction.find({ $or: [{ to: address }, { from: address }] })
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _view;
