const _requestETH = ({ dataAccess, entities, getRate }) => {
  return async (info) => {
    try {
      const data = entities.requestETH(info);
    
      const jsonObject = {
        senderId: data.get_senderId(),
        senderAddress: data.get_senderAddress(),
        receiverAddress: data.get_receiverAddress(),
        amount: data.get_ETHAmount(),
      };

      const { USD } = await getRate();

      jsonObject.USDRate = USD;
    
      return await dataAccess.requestETH(jsonObject);
    } catch (error) {
      throw new Error(error);
    }
  };
};

module.exports = { _requestETH };
