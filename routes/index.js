const express = require("express");
const categoryRoutes = require("./categoryRoutes");
const usersRoutes = require("./usersRoutes");
const transactionsRoutes = require("./transactionsRoutes");
const authRoutes = require('./authRoutes')
const {verify} = require('../middlewares/JWT')
const router = express.Router();

router.use("/", authRoutes);
//Middleware used for categories request
router.use("/", verify);
router.use("/", categoryRoutes);
//Middleware used for user request
router.use("/", usersRoutes);
//Middleware used for user trasactionsRoutes
router.use("/", transactionsRoutes);

module.exports = router;
