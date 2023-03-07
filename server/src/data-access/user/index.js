const User = require("../models/User");
const Account = require("../models/Account");

const { newWallet } = require("../../util/wallet");

const _view = require("./view");
const _make = require("./make");
const _update = require("./update");
const { _question, _recovery, _getRecoveryQuestion } = require("./question");

const view = _view({ User });
const make = _make({ User, Account, newWallet });
const update = _update({ User });
const question = _question({ User });
const recovery = _recovery({ User });
const getRecoveryQuestion = _getRecoveryQuestion({ User });

module.exports = {
  view,
  make,
  update,
  question,
  recovery,
  getRecoveryQuestion,
};
