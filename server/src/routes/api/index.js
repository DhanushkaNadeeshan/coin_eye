const express = require("express");
const router = express.Router();

// Handle request to the '/api' endpoint
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the user API!" });
});

const account = require("./account");
router.use("/account", account);

const user = require("./user");
router.use("/user", user);

const signup = require("./signup");
router.use("/signup", signup);

const login = require("./login");
router.use("/login", login);

const auth = require("./auth");
router.use("/auth", auth);

const logout = require("./logout");
router.use("/logout", logout);

module.exports = router;
