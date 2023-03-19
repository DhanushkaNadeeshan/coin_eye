const useCase = require("../../use-cases/account");
const { dataEncryption } = require("../../util/AESEncryption");

const _viewETH = require("./viewETH");
const _updateTransactionBalanceETH = require("./updateETH");
const {
  _updateSavingBalanceUSD,
  _updateTransactionBalanceUSD,
} = require("./updateUSD");
const _recoveryETH = require("./recoveryETH");

const viewETHController = _viewETH(
  useCase.usecaseViewETHByAddress,
  dataEncryption
);

const updateTransactionETHController = _updateTransactionBalanceETH(
  useCase.updateTransactionBalanceETH
);

const updateSavingUSDController = _updateSavingBalanceUSD(
  useCase.updateSavingBalanceUSD
);

const updateTransactionUSDController = _updateTransactionBalanceUSD(
  useCase.updateTransactionBalanceUSD
);

const recoveryETHController = _recoveryETH(useCase.recoveryETH);

module.exports = {
  viewETHController,
  updateTransactionETHController,
  updateSavingUSDController,
  updateTransactionUSDController,
  recoveryETHController,
};
