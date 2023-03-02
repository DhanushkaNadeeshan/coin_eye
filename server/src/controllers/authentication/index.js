const { login } = require("../../use-cases/authentication");
const { verifyGoogleToken } = require("../../util/google");

const _loginWithGoogle = require("./loginWithGoogle");

const loginWithGoogle = _loginWithGoogle(verifyGoogleToken, login);

module.exports = { loginWithGoogle };
