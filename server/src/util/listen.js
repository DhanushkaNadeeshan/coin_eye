const { sendAlert } = require("./alert");
const { create } = require("../controllers/transaction");

function onBlockCallback(ethers,provider, blockNumber) {
  provider
    .getBlock(blockNumber)
    .then((block) => {
      const txs = block.transactions;

      for (const txHash of txs) {
        provider
          .getTransaction(txHash)
          .then(async (tx) => {
            if (tx.value.gt(0)) {
              // check wallet address available
              const isTransaction = [tx.to, tx.from].some((address) =>
                global.walletList.includes(address)
              );

              if (isTransaction) {

                const transactionObject = {
                  txHash: txHash,
                  from: tx.from,
                  to: tx.to,
                  value: ethers.utils.formatEther(tx.value),
                  blockNumber: tx.blockNumber,
                  blockHash: tx.blockHash,
                  gasPrice: tx.gasLimit.toString(),
                };
                console.log(transactionObject);

                create(transactionObject)
                  .then((rs) => {
                    // notify wallet owner if he is online
                    sendAlert(tx.to, "update.balance.ETH");
                  })
                  .catch((err) => console.log(err));
              }
            }
          })
          .catch((err) => {
            console.log("Error retrieving transaction:", err);
          });
      }
    })
    .catch((err) => {
      console.log("Error retrieving block:", err);
    });
}

module.exports = { onBlockCallback };
