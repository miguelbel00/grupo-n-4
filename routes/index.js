const express = require('express')
const categoryRoutes = require('./categoryRoutes')
const users = require("./user.routes")
const router = express.Router()

router.use('/', categoryRoutes, users)


module.exports = router
