const _viewETHByAddress = ({ Account }) => {
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

const _viewAllETH = ({ Account }) => {
  return () => {
    return new Promise((resolve, reject) => {
      Account.find({})
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = { _viewETHByAddress, _viewAllETH };
