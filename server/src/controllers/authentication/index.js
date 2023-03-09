const { login } = require("../../use-cases/authentication");
const { verifyGoogleToken } = require("../../util/google");

const _loginWithGoogle = require("./loginWithGoogle");
const _logout = require("./logout");

const loginWithGoogle = _loginWithGoogle(verifyGoogleToken, login);
const logout = _logout();

module.exports = { loginWithGoogle, logout };
