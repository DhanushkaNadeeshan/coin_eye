const _view = ({ Swap }) => {
  return ({ address }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Swap.find({
          $and: [
            { status: "pending" },
            {
              $or: [
                {
                  senderAddress: address,
                },
                { receiverAddress: address },
              ],
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _view };
