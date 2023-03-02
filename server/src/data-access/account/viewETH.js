const _viewETH = ({ Account }) => {
  return (info) => {
    const { address } = info;
    return new Promise((resolve, reject) => {
      Account.findOne({ wallet_address: address })
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _viewETH;
