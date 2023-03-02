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
const _viewETH = require("./viewETH");

const viewETH = _viewETH({ Account });
const updateSavingBalanceETH = _updateSavingBalanceETH({ Account });
const updateTransactionBalanceETH = _updateTransactionBalanceETH({ Account });
const updateSavingBalanceUSD = _updateSavingBalanceUSD({ User, stripe });
const updateTransactionBalanceUSD = _updateTransactionBalanceUSD({ User });

module.exports = {
  viewETH,
  updateSavingBalanceETH,
  updateSavingBalanceUSD,
  updateTransactionBalanceETH,
  updateTransactionBalanceUSD,
};
