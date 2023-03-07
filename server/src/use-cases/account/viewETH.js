const _viewETHByAddress = ({ dataAccess, entities }) => {
  return async (info) => {
    try {
      const data = entities.viewETH(info);
      const address = data.get_walletAddress();
      return await dataAccess.viewETHByAddress({ address });
    } catch (error) {
      console.log("🚀 ~ file: view.js:8 ~ view ~ error:", error);
      throw new Error(error);
    }
  };
};
const _viewAllETH = ({ dataAccess }) => {
  return async () => {
    try {
      const data = await dataAccess.viewAllETH();
      return data;
    } catch (error) {
      console.log("🚀 ~ file: viewETH.js:21 ~ return ~ error:", error);
      throw new Error(error);
    }
  };
};

module.exports = { _viewETHByAddress, _viewAllETH };
