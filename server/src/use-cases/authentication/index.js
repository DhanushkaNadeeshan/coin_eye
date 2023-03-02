const entities = require("../../entities/authentication");
const dataAccess = require("../../data-access/authentication");
const { updateSavingBalanceETH } = require("../../data-access/account");
const { getETHBalance } = require("../../util/wallet");

const _login = require("./login");

const login = _login({
  dataAccess,
  entities,
  getETHBalance,
  updateSavingBalanceETH,
});

module.exports = { login };
