// entity
const entities = require("../../entities/account");
// data-access
const dataAccess = require("../../data-access/account");

const { _viewETHByAddress, _viewAllETH } = require("./viewETH");

const {
  _updateSavingBalanceETH,
  _updateTransactionBalanceETH,
} = require("./updateETH");

const {
  _updateSavingBalanceUSD,
  _updateTransactionBalanceUSD,
} = require("./updateUSD");

const usecaseViewETHByAddress = _viewETHByAddress({ dataAccess, entities });

const usecaseViewAllETH = _viewAllETH({ dataAccess });

const updateSavingBalanceUSD = _updateSavingBalanceUSD({
  dataAccess,
  entities,
});
const updateTransactionBalanceUSD = _updateTransactionBalanceUSD({
  dataAccess,
  entities,
});
const updateSavingBalanceETH = _updateSavingBalanceETH({
  dataAccess,
  entities,
});
const updateTransactionBalanceETH = _updateTransactionBalanceETH({
  dataAccess,
  entities,
});

module.exports = {
  usecaseViewAllETH,
  usecaseViewETHByAddress,
  updateSavingBalanceUSD,
  updateTransactionBalanceUSD,
  updateSavingBalanceETH,
  updateTransactionBalanceETH,
};
