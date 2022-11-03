const express = require("express");
const categoryRoutes = require("./categoryRoutes");
const users = require("./user.routes");
const router = express.Router();

router.use("/", users);
router.use("/", categoryRoutes);

module.exports = router;
