const User = require("../models/User");
const Account = require("../models/Account");

const dataAccessNotification = require("../notification");

const _login = require("./login");

const login = _login({ User, Account, dataAccessNotification });

module.exports = { login };
