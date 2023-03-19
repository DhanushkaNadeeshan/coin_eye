const Account = require("../models/Account");
const User = require("../models/User");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { sendAlert } = require("../../util/alert");
const wallet = require("../../util/wallet");

const {
  _updateSavingBalanceETH,
  _updateTransactionBalanceETH,
} = require("./updateETH");
const {
  _updateTransactionBalanceUSD,
  _updateSavingBalanceUSD,
} = require("./updateUSD");

const { _recoveryETH } = require("./recoveryETH");
const { _viewAllETH, _viewETHByAddress } = require("./viewETH");

const viewETHByAddress = _viewETHByAddress({ Account });
const viewAllETH = _viewAllETH({ Account });
const updateSavingBalanceETH = _updateSavingBalanceETH({ Account });
const updateTransactionBalanceETH = _updateTransactionBalanceETH({ Account });
const updateSavingBalanceUSD = _updateSavingBalanceUSD({ User, stripe });
const updateTransactionBalanceUSD = _updateTransactionBalanceUSD({ User });
const recoveryETH = _recoveryETH({
  Account,
  wallet,
  sendAlert,
});

module.exports = {
  viewETHByAddress,
  viewAllETH,
  updateSavingBalanceETH,
  updateSavingBalanceUSD,
  updateTransactionBalanceETH,
  updateTransactionBalanceUSD,
  recoveryETH,
};
