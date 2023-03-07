const {
  usecaseSelect,
  usecaseUpdate,
  usecaseMake,
  usecaseQuestion,
  usecaseRecovery,
  usecaseGetRecoveryQuestion,
} = require("../../use-cases/user");

const { verifyGoogleToken } = require("../../util/google");

const _view = require("./view");
const _makeWithGoogle = require("./makeWithGoogle");
const _update = require("./update");
const { _question, _recovery, _getRecoveryQuestion } = require("./question");

const selectController = _view(usecaseSelect);
const makeWithGoogle = _makeWithGoogle(verifyGoogleToken, usecaseMake);
const update = _update(usecaseUpdate);
const question = _question(usecaseQuestion);
const recovery = _recovery(usecaseRecovery);
const getRecoveryQuestion = _getRecoveryQuestion(usecaseGetRecoveryQuestion);

module.exports = {
  selectController,
  makeWithGoogle,
  update,
  question,
  recovery,
  getRecoveryQuestion,
};
