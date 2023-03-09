const useCase = require("../../use-cases/swap");

const { _requestETH } = require("./requestETH");
const { _view } = require("./view");
const { _update } = require("./update");

const requestETH = _requestETH(useCase.usecaseRequestETH);
const view = _view(useCase.usecaseView);
const update = _update(useCase.usecaseUpdate);

module.exports = {
  requestETH,
  view,
  update,
};
