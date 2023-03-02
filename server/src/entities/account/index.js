const _viewETH = require("./viewETH");
const {
  _updateSavingBalanceETH,
  _updateTransactionBalanceETH,
} = require("./updateETH");

const {
  _updateSavingBalanceUSD,
  _updateTransactionBalanceUSD,
} = require("./updateUSD");

const viewETH = _viewETH();
const updateSavingBalanceETH = _updateSavingBalanceETH();
const updateTransactionBalanceETH = _updateTransactionBalanceETH();
const updateSavingBalanceUSD = _updateSavingBalanceUSD();
const updateTransactionBalanceUSD = _updateTransactionBalanceUSD();

module.exports = {
  viewETH,
  updateSavingBalanceETH,
  updateTransactionBalanceETH,
  updateSavingBalanceUSD,
  updateTransactionBalanceUSD,
};
