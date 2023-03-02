const view = require("./view");
const update = require("./update");
const make = require("./make");

const _view = view();
const _update = update();
const _make = make();

module.exports = { _view, _update, _make };
