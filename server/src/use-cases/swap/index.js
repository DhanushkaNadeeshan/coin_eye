// entity
const entities = require("../../entities/swap");
// data-access
const dataAccess = require("../../data-access/swap");

const { getRate } = require("../../util/rate");

const { _requestETH } = require("./requestETH");
const { _view } = require("./view");
const { _update } = require("./update");

const usecaseRequestETH = _requestETH({ dataAccess, entities, getRate });
const usecaseView = _view({ dataAccess, entities });
const usecaseUpdate = _update({ dataAccess, entities });

module.exports = {
  usecaseRequestETH,
  usecaseView,
  usecaseUpdate,
};
