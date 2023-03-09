const { _view } = require("./view");
const { _updateReadStatus } = require("./update");

const view = _view();
const updateReadStatus = _updateReadStatus();

module.exports = { view, updateReadStatus };
