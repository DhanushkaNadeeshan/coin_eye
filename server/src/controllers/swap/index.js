const useCase = require("../../use-cases/swap");


const { _requestETH } = require("./requestETH");
const { _view } = require("./view");

const requestETH = _requestETH(useCase.usecaseRequestETH);
const view = _view(useCase.usecaseView);

module.exports = {
  requestETH,
  view
};
