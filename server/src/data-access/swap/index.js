const User = require("../models/User");
const Swap = require("../models/Swap");
const Account = require("../models/Account");

const dataAccessNotification = require("../notification");

const { sendEther } = require("../../util/wallet");

const { sendAlert } = require("../../util/alert");
const { _requestETH } = require("./requestETH");
const { _view } = require("./view");
const { _update } = require("./update");

const requestETH = _requestETH({
  User,
  Swap,
  sendAlert,
  dataAccessNotification,
  Account,
});
const update = _update({
  Swap,
  sendAlert,
  dataAccessNotification,
  sendEther,
  Account,
});

const view = _view({ Swap });

module.exports = { requestETH, view, update };
