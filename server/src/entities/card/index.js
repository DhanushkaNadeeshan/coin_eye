const _view = require("./view");
const _update = require("./update");
const _make = require("./make");
const _remove = require("./remove");

const view = _view();
const update = _update();
const make = _make();
const remove = _remove();

module.exports = { view, update, make, remove };
