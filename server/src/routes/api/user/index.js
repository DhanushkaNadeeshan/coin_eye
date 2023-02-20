const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../../../controllers/user");
const { cookieJwtAuth } = require("../../../middlewares/cookeJwtAuth");

router.get("/", (req, res) => {
  getUsers()
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

router.post("/", (req, res) => {
  createUser(req.body)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => res.json({ success: false, err }));
});
module.exports = router;
