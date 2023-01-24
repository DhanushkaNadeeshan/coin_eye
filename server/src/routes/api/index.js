const express = require("express");
const router = express.Router();

// Handle request to the '/api' endpoint
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the user API!" });
});

const user = require("./user");
router.use("/user", user);

module.exports = router;
