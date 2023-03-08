const Account = require("../models/Account");
const User = require("../models/User");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const {
  _updateSavingBalanceETH,
  _updateTransactionBalanceETH,
} = require("./updateETH");
const {
  _updateTransactionBalanceUSD,
  _updateSavingBalanceUSD,
} = require("./updateUSD");
const { _viewAllETH, _viewETHByAddress } = require("./viewETH");

const viewETHByAddress = _viewETHByAddress({ Account });
const viewAllETH = _viewAllETH({ Account });
const updateSavingBalanceETH = _updateSavingBalanceETH({ Account });
const updateTransactionBalanceETH = _updateTransactionBalanceETH({ Account });
const updateSavingBalanceUSD = _updateSavingBalanceUSD({ User, stripe });
const updateTransactionBalanceUSD = _updateTransactionBalanceUSD({ User });

module.exports = {
  viewETHByAddress,
  viewAllETH,
  updateSavingBalanceETH,
  updateSavingBalanceUSD,
  updateTransactionBalanceETH,
  updateTransactionBalanceUSD,
};
