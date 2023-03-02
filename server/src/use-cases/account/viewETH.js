const _viewETH = ({ dataAccess, etities }) => {
  return async (info) => {
    try {
      const data = etities.viewETH(info);
      const wallet_address = data.get_walletAddress();
      return await dataAccess.view({ wallet_address });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);

      return { msg: "come from error" };
    }
  };
};

module.exports = _viewETH;
