const { ethers } = require("ethers");
const INFURA_ID = process.env.INFURA_ID;

function newWallet() {
  const wallet = ethers.Wallet.createRandom();
  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
  return response;
}

function getBalance(address) {
  return new Promise(async (resolve, reject) => {
    if (address) {
      try {
        const provider = new ethers.providers.InfuraProvider("goerli", INFURA_ID);
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

module.exports = { newWallet, getBalance };
