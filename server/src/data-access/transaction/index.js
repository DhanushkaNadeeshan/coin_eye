const Transaction = require("../models/Transaction");

const _make = require("./make");
const _view = require("./view");

const make = _make({ Transaction });
const view = _view({ Transaction });

module.exports = { make, view };
