const { _requestETH } = require("./requestETH");
const { _view } = require("./view");
const requestETH = _requestETH();
const view = _view();

module.exports = {
  requestETH,
  view,
};
