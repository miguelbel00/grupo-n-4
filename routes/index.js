const express = require('express')
const categoryRoutes = require('./categoryRoutes')
const usersRoutes = require('./usersRoutes')

const router = express.Router()

// example of a route with index controller get function
router.use('/', categoryRoutes)
router.use('/', usersRoutes)

module.exports = router
