const {
  usecaseSelect,
  usecaseUpdate,
  usecaseMake,
} = require("../../use-cases/user");

const { verifyGoogleToken } = require("../../util/google");

const _view = require("./view");
const _makeWithGoogle = require("./makeWithGoogle");
const _update = require("./update");

const selectController = _view(usecaseSelect);
const makeWithGoogle = _makeWithGoogle(verifyGoogleToken, usecaseMake);
const update = _update(usecaseUpdate);

module.exports = {
  selectController,
  makeWithGoogle,
  update,
};
