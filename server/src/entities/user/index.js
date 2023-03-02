const _view = require("./view");
const _update = require("./update");
const _make = require("./make");

const view = _view();
const update = _update();
const make = _make();

// const services = Object.freeze({ _view });

// module.exports = services;

module.exports = { view, update, make };
