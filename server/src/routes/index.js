const express = require("express");
const router = express.Router();


const account = require("./account");
router.use("/account", account);

const user = require("./user");
router.use("/user", user);

const authentication = require("./authentication");
router.use("/authentication", authentication);

const card = require("./card");
router.use("/card", card);

const transaction = require("./transaction");
router.use("/transaction", transaction);


module.exports = router;
