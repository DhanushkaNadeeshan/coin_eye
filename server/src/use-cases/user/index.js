// entity
const entities = require("../../entities/user");
// data-access
const dataAccess = require("../../data-access/user");

const _view = require("./view");
const _update = require("./update");
const _make = require("./make");
const { _question, _recovery, _getRecoveryQuestion } = require("./question");

const usecaseSelect = _view({ dataAccess, entities });
const usecaseUpdate = _update({ dataAccess, entities });
const usecaseMake = _make({ dataAccess, entities });
const usecaseQuestion = _question({ dataAccess, entities });
const usecaseRecovery = _recovery({ dataAccess, entities });
const usecaseGetRecoveryQuestion = _getRecoveryQuestion({
  dataAccess,
  entities,
});

module.exports = {
  usecaseSelect,
  usecaseUpdate,
  usecaseMake,
  usecaseQuestion,
  usecaseRecovery,
  usecaseGetRecoveryQuestion,
};
