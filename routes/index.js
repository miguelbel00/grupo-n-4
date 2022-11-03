const express = require("express");
const categoryRoutes = require("./categoryRoutes");
const router = express.Router();

router.use("/", categoryRoutes);

router.use("/", categoryRoutes);

module.exports = router;
