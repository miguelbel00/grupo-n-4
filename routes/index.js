const express = require("express");
const categoryRoutes = require("./categoryRoutes");
const usersRoutes = require("./usersRoutes");
const transactionsRoutes = require("./transactionsRoutes");

const router = express.Router();
//Middleware used for categories request
router.use("/", categoryRoutes);
//Middleware used for user request
router.use("/", usersRoutes);
//Middleware used for user trasactionsRoutes
router.use("/", transactionsRoutes);

module.exports = router;
