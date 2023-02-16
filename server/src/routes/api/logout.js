const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.clearCookie("key");
  res.status(200).json({ success: true });
});

module.exports = router;
