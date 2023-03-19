const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user");

const { cookieJwtAuth } = require("../../middlewares/cookeJwtAuth");

const route = require("./routes");

const routes = route(router, controller, cookieJwtAuth);

// module.exports = {
//   routes,
// };

module.exports = routes;
