const { ethers } = require("ethers");

function getProvider() {
  const sepoliaNetwork = {
    name: "sepolia",
    chainId: 31337,
    rpcUrl: "https://rpc.sepolia.org",
  };

  const provider = new ethers.providers.JsonRpcProvider(sepoliaNetwork.rpcUrl);
  return provider;
}

function newWallet() {
  const wallet = ethers.Wallet.createRandom();
  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };

  return response;
}

function sendEther(amount, senderPrivateKey, receiverAddress, callback) {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = getProvider();
      const wallet = new ethers.Wallet(senderPrivateKey, provider);

      const tx = await wallet.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther(amount),
      });

      resolve("procesing");

      await tx.wait();
      callback();
    } catch (error) {
      reject(error);
    }
  });
}
// 0x436579D3b3b2eEabA30B9Cc3d4B3E80415676c8f
function sendAllETH(fromPrivateKey, toAddress, callback) {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = getProvider();

      const wallet = new ethers.Wallet(fromPrivateKey, provider);

      const accountBalance = await wallet.getBalance();

      const gasPrice = await provider.getGasPrice();
      const gasLimit = 50000;
      const txCost = gasPrice.mul(gasLimit);

      if (txCost.gt(accountBalance)) {
        console.log("Insufficient funds to cover gas cost");
        return;
      }

      // let newGasPrice = gasPrice.div(2); // Reduce gas price by half
      let newGasPrice = ethers.utils.formatUnits(txCost);

      const txAccountBalance =
        ethers.utils.formatUnits(accountBalance) - newGasPrice;

      const tx = await wallet.sendTransaction({
        to: toAddress,
        value: ethers.utils.parseEther(`${txAccountBalance}`),
      });

      resolve("procesing");
      await tx.wait();
      callback();
      console.log("call");
    } catch (error) {
      reject(error);
    }
  });
}

// sendAllETH("0x0ac225509ae6f17b3aa4f567ac1e3dacfb2ffc9d3a806cc9120fd6ccc0b98e56","0xD548D777a34075a5ca27F2f0CCDDFd45E56ab734");

function getETHBalance(address) {
  return new Promise(async (resolve, reject) => {
    if (address) {
      try {
        const provider = getProvider();
        let balance = await provider.getBalance(address);
        balance = ethers.utils.formatEther(balance);
        resolve(balance);
      } catch (error) {
        reject(error);
      }
    } else {
      reject("address is empty");
    }
  });
}

function getGasPrice() {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = getProvider();

      // Get the current gas price in wei
      const gasPrice = await provider.getGasPrice();
      console.log(
        "🚀 ~ file: wallet.js:69 ~ returnnewPromise ~ gasPrice:",
        gasPrice
      );

      // Convert gas price from wei to gwei
      const gasPriceGwei = ethers.utils.formatUnits(gasPrice, "gwei");

      resolve(gasPriceGwei);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  newWallet,
  getETHBalance,
  getProvider,
  sendEther,
  getGasPrice,
  sendAllETH,
};
