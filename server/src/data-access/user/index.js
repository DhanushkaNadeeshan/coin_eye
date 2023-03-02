const User = require("../models/User");
const Account = require("../models/Account");

const { newWallet } = require("../../util/wallet");

const _view = require("./view");
const _make = require("./make");
const _update = require("./update");

const view = _view({ User });
const make = _make({ User, Account ,newWallet});
const update = _update({ User });

module.exports = { view, make, update };
