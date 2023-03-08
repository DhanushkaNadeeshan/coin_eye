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

module.exports = { convertUSD };
