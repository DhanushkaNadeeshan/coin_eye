const express = require("express");
const router = express.Router();
const { updateETH } = require("../../../controllers/account");
const { cookieJwtAuth } = require("../../../middlewares/cookeJwtAuth");
const { getBalance } = require("../../../util/wallet");
const { getTransactions } = require("../../../controllers/transaction");
const { newCard, getUSD } = require("../../../controllers/usd");
// middleware protection
// router.use(cookieJwtAuth);

router.get("/ETH/:address", (req, res) => {
  const { address } = req.params;
  // get from ether network
  if (!address) {
    return res.json({ success: false, msg: "wallet address is required!" });
  }
  getBalance(address)
    .then((balance) => {
      res.json({ success: true, balance });
      // update latest balance in ether network
      updateETH(address, balance);
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.get("/ETH/tx/:address", (req, res) => {
  const { address } = req.params;
  // get from ether network
  if (!address) {
    return res.json({ success: false, msg: "wallet address is required!" });
  }

  getTransactions(address)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((error) => {
      console.log("🚀 ~ file: index.js:40 ~ router.get ~ error:", error);
      res.json({ success: false });
    });
});

router.post("/get/USD", (req, res) => {
  const data = req.body;

  getUSD(data)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((error) => {
      console.log("🚀 ~ file: index.js:51 ~ getUSD ~ error:", typeof error);
      if (error.raw?.type === "card_error") {
        return res.json({ success: false, message : error.raw?.message});
      }
      res.json({ success: false });
    });
});

router.post("/card", (req, res) => {
  const data = req.body;

  // if (!data.email) {
  //   return res.json({ success: false });
  // }

  newCard(data)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((error) => {
      console.log("🚀 ~ file: index.js:55 ~ router.post ~ error:", error);
      res.json({ success: false });
    });
});

module.exports = router;
