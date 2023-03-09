// entity
const entities = require("../../entities/notification");
// data-access
const dataAccess = require("../../data-access/notification");

const { _view } = require("./view");
const { _updateReadStatus } = require("./update");

const usecaseView = _view({ dataAccess, entities });
const usecaseUpdateReadStatus = _updateReadStatus({ dataAccess, entities });

module.exports = {
  usecaseView,
  usecaseUpdateReadStatus,
};
