const useCase = require("../../use-cases/account");

const _viewETH = require("./viewETH");
const _updateTransactionBalanceETH = require("./updateETH");
const {
  _updateSavingBalanceUSD,
  _updateTransactionBalanceUSD,
} = require("./updateUSD");

const viewETHController = _viewETH(useCase.usecaseViewETHByAddress);

const updateTransactionETHController = _updateTransactionBalanceETH(
  useCase.updateTransactionBalanceETH
);

const updateSavingUSDController = _updateSavingBalanceUSD(
  useCase.updateSavingBalanceUSD
);

const updateTransactionUSDController = _updateTransactionBalanceUSD(
  useCase.updateTransactionBalanceUSD
);

module.exports = {
  viewETHController,
  updateTransactionETHController,
  updateSavingUSDController,
  updateTransactionUSDController,
};
