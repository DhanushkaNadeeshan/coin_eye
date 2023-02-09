const { ethers } = require("ethers");

function newWallet() {
  const wallet = ethers.Wallet.createRandom();
  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address
  };
  return response;
}

module.exports = { newWallet };
