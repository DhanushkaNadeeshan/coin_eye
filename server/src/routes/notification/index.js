const express = require("express");
const router = express.Router();

const controller = require("../../controllers/notification");

const { cookieJwtAuth } = require("../../middlewares/cookeJwtAuth");

const route = require("./routes");

router.use(cookieJwtAuth);

const routes = route(router, controller);

// module.exports = {
//   routes,
// };

module.exports = routes;