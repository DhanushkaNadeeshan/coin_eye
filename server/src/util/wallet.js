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

      resolve("proccesing");

      await tx.wait();
      callback();
    } catch (error) {
      reject(error);
    }
  });
}

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

module.exports = { newWallet, getETHBalance, getProvider, sendEther };
