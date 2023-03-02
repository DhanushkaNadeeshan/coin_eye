const _make = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.make(info);

      const transaction = {
        txHash: data.get_txHash(),
        from: data.get_from(),
        to: data.get_to(),
        value: data.get_value(),
        blockNumber: data.get_blockNumber(),
        blockHash: data.get_blockHash(),
        gasPrice: data.get_gasPrice(),
      };

      const result = await dataAccess.make(transaction);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: make.js:16 ~ return ~ error:", error);
      return { msg: "user creation faild" };
    }
  };
};

module.exports = _make;
