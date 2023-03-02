const User = require("../models/User");

const _make = require("./make");
const _remove = require("./remove");
const _update = require("./update");

const make = _make({ User });
const remove = _remove({ User });
const update = _update({ User });

module.exports = { make, remove, update };
