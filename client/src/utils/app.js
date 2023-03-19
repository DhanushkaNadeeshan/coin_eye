const convertUSD = (usd) => {
  if (usd === 0) {
    return usd;
  }

  usd = `${usd}`;

  let dec = usd.substr(usd.length - 2);
  let int = usd.substr(0, usd.length - 2);

  usd = `${int}.${dec}`;
  return usd;
};

const convertUSDWithoutDecimal = (usd) => {
  let [int, dec] = usd.split(".");
  let tempAmount = [...int, ...dec];

  tempAmount = tempAmount.join("");
  tempAmount = parseInt(tempAmount);

  return tempAmount;
};

const dataEncryptionAES = (CryptoJS, data) => {
  const key = window.sessionStorage.getItem("AES");

  const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
  // console.log("🚀 ~ file: app.js:29 ~ dataEncryptionAES ~ ciphertext:", ciphertext)
  // let encData  = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(ciphertext))

  return ciphertext;
};

const dataDecryptedAES = (CryptoJS, ciphertext) => {
  const key = window.sessionStorage.getItem("AES");
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};

module.exports = {
  convertUSD,
  convertUSDWithoutDecimal,
  dataEncryptionAES,
  dataDecryptedAES,
};
