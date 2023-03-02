const express = require("express");
const router = express.Router();

const controller = require("../../controllers/transacion");

const route = require("./routes");

const routes = route(router, controller);

// module.exports = {
//   routes,
// };

module.exports = routes;
