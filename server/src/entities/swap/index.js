const { _requestETH } = require("./requestETH");
const { _view } = require("./view");
const { _update } = require("./update");

const requestETH = _requestETH();
const view = _view();
const update = _update();

module.exports = {
  requestETH,
  view,
  update,
};
