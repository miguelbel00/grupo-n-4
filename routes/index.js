const express = require('express')
const User = require('./User')

const router = express.Router()

//Middleware used for user request
router.use('/', User)

module.exports = router
