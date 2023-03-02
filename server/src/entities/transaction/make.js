const make = () => {
  return function _make({
    txHash,
    from,
    to,
    value,
    blockNumber,
    blockHash,
    gasPrice,
  }) {
    // if (!email) {
    //   throw new Error("Please insert mail");
    // }

    return Object.freeze({
      get_txHash: () => txHash,
      get_from: () => from,
      get_to: () => to,
      get_value: () => value,
      get_blockNumber: () => blockNumber,
      get_blockHash: () => blockHash,
      get_gasPrice: () => gasPrice,
    });
  };
};

module.exports = make;
