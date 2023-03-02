const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users");

const route = require("./routes");

const userRoutes = route({ usersController, router });

module.exports = router;
