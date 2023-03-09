const _update = ({
  Swap,
  sendAlert,
  dataAccessNotification,
  sendEther,
  Account,
}) => {
  return (info) => {
    const { id, status } = info;

    return new Promise(async (resolve, reject) => {
      try {
        let swap = await Swap.findOne({ _id: id });

        swap.status = status;

        const result = {
          id,
          status,
        };

        switch (status) {
          case "cancel":
            await swap.save();
            sendAlert(swap.receiverAddress, "swap.request.cancel.ETH");
            break;
          case "reject":
            await swap.save();
            sendAlert(swap.senderAddress, `swap.request.reject.ETH`);
            break;
          case "accept": {
            const { private_key } = await Account.findOne({
              wallet_address: swap.receiverAddress,
            });

            if (!private_key) {
              return reject("can't find private key");
            }

            const rs = await sendEther(
              `${swap.ETHValue}`,
              private_key,
              swap.senderAddress,
              async () => {
                await swap.save();
                sendAlert(swap.senderAddress, `swap.request.accept.ETH`);
                sendAlert(swap.receiverAddress, `swap.process.done.ETH`);
              }
            );

            result.status = rs;
            break;
          }
          default:
            break;
        }

        const notification = {
          type: "swap",
          description: `request id : ${id} , update status : ${status}`,
          ref: [
            {
              id: id,
              document: "swaps",
            },
          ],
        };

        //save notification as sender
        dataAccessNotification.findByAddressAndMake({
          address: swap.senderAddress,
          ...notification,
        });

        //save notification as receiver
        dataAccessNotification.findByAddressAndMake({
          address: swap.receiverAddress,
          ...notification,
        });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _update };
