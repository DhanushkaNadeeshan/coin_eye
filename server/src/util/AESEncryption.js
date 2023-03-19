const CryptoJS = require("crypto-js");

const dataEncryption = (key, data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();

  return ciphertext;
};

const dataDecryption = (key, ciphertext) => {
  try {
    let bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { dataEncryption, dataDecryption };
