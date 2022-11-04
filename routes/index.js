const express = require('express')
const User = require('./usersRoutes')
const categoryRoutes = require('./categoryRoutes')
const router = express.Router()

//Middleware used for user request
router.use('/', User)
router.use('/', categoryRoutes)


module.exports = router
