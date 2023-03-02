const _viewETHByAddress = ({ dataAccess, etities }) => {
  return async (info) => {
    try {
      const data = etities.viewETH(info);
      const address = data.get_walletAddress();
      return await dataAccess.viewETHByAddress({ address });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);

      return { msg: "come from error" };
    }
  };
};

module.exports = _viewETHByAddress;
