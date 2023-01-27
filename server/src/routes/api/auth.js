const express = require("express");
const { validateToken } = require("../../util/jwt");

const router = express.Router();

router.post("/jwt", async (req, res) => {
  const { key } = req.body;
  const rs = validateToken(key);

  if (rs.success) {
    res.status(201).json({
      valide: true,
    });
  } else {
    res.status(201).json({
      valide: false,
    });
  }
});

module.exports = router;
