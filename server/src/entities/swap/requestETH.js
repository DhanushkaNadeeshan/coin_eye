const _requestETH = () => {
  return ({ senderId, amount, senderAddress, receiverAddress }) => {
    if (!senderId) {
      throw new Error("Please insert sender Id");
    }

    if (!senderAddress) {
      throw new Error("Please insert sender Address");
    }
    if (!receiverAddress) {
      throw new Error("Please insert receiver Address");
    }
    if (!amount) {
      throw new Error("Please insert amount");
    }

    return Object.freeze({
      get_senderId: () => senderId,
      get_senderAddress: () => senderAddress,
      get_receiverAddress: () => receiverAddress,
      get_ETHAmount: () => amount,
    });
  };
};

module.exports = { _requestETH };
