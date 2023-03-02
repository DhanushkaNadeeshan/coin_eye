const Transaction = require("../models/Transaction");
const { sendAlert } = require("../../util/alert");

const _make = require("./make");
const _view = require("./view");

const make = _make({ Transaction, sendAlert });
const view = _view({ Transaction });

module.exports = { make, view };
