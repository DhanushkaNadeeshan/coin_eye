const express = require("express");
const router = express.Router();

const { cookieJwtAuth } = require("../../middlewares/cookeJwtAuth");

const controller = require("../../controllers/transacion");

const route = require("./routes");

router.use(cookieJwtAuth);

const routes = route(router, controller);

// module.exports = {
//   routes,
// };

module.exports = routes;
