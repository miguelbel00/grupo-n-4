const express = require('express')
const User = require('./usersRoutes')
const categoryRoutes = require('./categoryRoutes')
const usersRoutes = require('./usersRoutes')
const router = express.Router()

//Middleware used for user request
router.use('/', User)
router.use('/', categoryRoutes)
router.use('/', usersRoutes)


module.exports = router
