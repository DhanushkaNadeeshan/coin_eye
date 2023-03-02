const { usecaseSelect } = require("../../use-cases/transaction");

const _view = require("./view");

const selectController = _view(usecaseSelect);
module.exports = {
  selectController,
};
