const express = require('express')
const { get } = require('../controllers/index')
const { getAllUsers } = require('../controllers/Users/UserSearchController')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.get('/allusers', getAllUsers)

module.exports = router
