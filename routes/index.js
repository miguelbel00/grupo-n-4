const express = require('express')
const categoryRoutes = require('./categoryRoutes')
const usersRoutes = require('./usersRoutes')
const router = express.Router()

//Middleware used for user request
router.use('/', categoryRoutes)
router.use('/', usersRoutes)


module.exports = router
