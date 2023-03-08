const User = require("../models/User");
const Swap = require("../models/Swap");

const { sendAlert } = require("../../util/alert");
const { _requestETH } = require("./requestETH");
const { _view } = require("./view");

const requestETH = _requestETH({ User, Swap, sendAlert });
const view = _view({ Swap });

module.exports = { requestETH, view };
