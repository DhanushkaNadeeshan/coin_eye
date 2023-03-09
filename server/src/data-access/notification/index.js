const Account = require("../models/Account");
const Notification = require("../models/Notification");

const { _make, _findByAddressAndMake } = require("./make");
const { _view } = require("./view");
const { _updateReadStatus } = require("./update");

const make = _make({ Notification });
const findByAddressAndMake = _findByAddressAndMake({ Notification, Account });
const view = _view({ Notification });
const updateReadStatus = _updateReadStatus({ Notification });

module.exports = {
  make,
  findByAddressAndMake,
  view,
  updateReadStatus,
};
