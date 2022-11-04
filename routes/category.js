const express = require('express')
// const { get } = require('../controllers/index')
const { get, post } = require('../controllers/category.controller')

const router = express.Router()

// example of a route with index controller get function
// router.get('/', get)
router.post('/', post)

module.exports = router