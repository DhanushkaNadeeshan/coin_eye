const _view = require("./view");
const _update = require("./update");
const _make = require("./make");
const { _question, _recovery, _getRecoveryQuestion } = require("./question");

const view = _view();
const update = _update();
const make = _make();
const question = _question();
const recovery = _recovery();
const getRecoveryQuestion = _getRecoveryQuestion();

// const services = Object.freeze({ _view });

// module.exports = services;

module.exports = {
  view,
  update,
  make,
  question,
  recovery,
  getRecoveryQuestion,
};
