// entity
const entities = require("../../entities/swap");
// data-access
const dataAccess = require("../../data-access/swap");

const { getRate } = require("../../util/rate");

const { _requestETH } = require("./requestETH");
const { _view } = require("./view");

const usecaseRequestETH = _requestETH({ dataAccess, entities, getRate });
const usecaseView = _view({ dataAccess, entities });

module.exports = {
  usecaseRequestETH,
  usecaseView,
};
