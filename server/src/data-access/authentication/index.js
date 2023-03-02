const User = require("../models/User");

const _login = require("./login");

const login = _login({ User });

module.exports = { login };
