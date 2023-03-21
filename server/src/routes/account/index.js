const express = require("express");
const router = express.Router();

const controller = require("../../controllers/account");

const { cookieJwtAuth } = require("../../middlewares/cookeJwtAuth");

const { checkAthurization } = require("../../middlewares/checkAuthrization");

const route = require("./routes");

router.use(cookieJwtAuth);

const routes = route(router, controller, checkAthurization);

// module.exports = {
//   routes,
// };

module.exports = routes;
