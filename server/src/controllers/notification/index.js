const useCase = require("../../use-cases/notification");

const { _view } = require("./view");
const { _updateReadStatus } = require("./update");

const view = _view(useCase.usecaseView);
const updateReadStatus = _updateReadStatus(useCase.usecaseUpdateReadStatus);

module.exports = {
  view,
  updateReadStatus,
};
