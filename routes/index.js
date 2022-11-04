const express = require('express')
const { get } = require('../controllers/index')
const categoryRoutes = require('./categoryRoutes')
const usersRoutes = require('./usersRoutes')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/', categoryRoutes)
router.use('/', usersRoutes)

module.exports = router
