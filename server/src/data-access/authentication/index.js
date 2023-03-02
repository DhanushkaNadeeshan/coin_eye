const User = require("../models/User");

const _loginWithGoogle = require("./loginWithGoogle");

const loginWithGoogle = _loginWithGoogle({ User });

module.exports = { loginWithGoogle };
