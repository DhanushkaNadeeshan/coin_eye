const crypto = require("crypto");

const { login } = require("../../use-cases/authentication");

const { verifyGoogleToken } = require("../../util/google");

const { createToken } = require("../../util/jwt");
const _loginWithGoogle = require("./loginWithGoogle");
const _logout = require("./logout");

const loginWithGoogle = _loginWithGoogle(
  verifyGoogleToken,
  login,
  createToken,
  crypto
);
const logout = _logout();

module.exports = { loginWithGoogle, logout };
