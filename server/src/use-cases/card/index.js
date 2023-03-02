// entity
const entities = require("../../entities/card");
// data-access
const dataAccess = require("../../data-access/card");

const _view = require("./view");
const _update = require("./update");
const _remove = require("./remove");
const _make = require("./make");

const usecaseSelect = _view({ dataAccess, entities });
const usecaseUpdate = _update({ dataAccess, entities });
const usecaseMake = _make({ dataAccess, entities });
const usecaseRemove = _remove({ dataAccess, entities });

module.exports = {
  usecaseSelect,
  usecaseUpdate,
  usecaseMake,
  usecaseRemove,
};
