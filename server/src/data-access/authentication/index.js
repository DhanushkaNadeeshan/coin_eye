const User = require("../models/User");
const Account = require("../models/Account");

const _login = require("./login");

const login = _login({ User ,Account });

module.exports = { login };
