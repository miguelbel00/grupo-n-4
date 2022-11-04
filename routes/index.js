const express = require("express");
const categoryRoutes = require("./categoryRoutes");
const usersRoutes = require("./usersRoutes");
const transactionsRoutes = require("./transactionsRoutes");

const router = express.Router();

router.use("/", categoryRoutes);
router.use("/", usersRoutes);
router.use("/", transactionsRoutes);

module.exports = router;
