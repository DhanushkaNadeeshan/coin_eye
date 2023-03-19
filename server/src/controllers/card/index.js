const {
  usecaseSelect,
  usecaseUpdate,
  usecaseMake,
  usecaseRemove,
} = require("../../use-cases/card");

const _view = require("./view");
const _make = require("./make");
const _update = require("./update");
const _remove = require("./remove");

const { dataDecryption, dataEncryption } = require("../../util/AESEncryption");

const selectController = _view(usecaseSelect);
const updateController = _update(usecaseUpdate, dataDecryption, dataEncryption);
const makeController = _make(usecaseMake, dataDecryption, dataEncryption);
const removeController = _remove(usecaseRemove);

module.exports = {
  selectController,
  updateController,
  makeController,
  removeController,
};
