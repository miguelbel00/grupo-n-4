const express = require('express')
const { getAllUsers } = require('../controllers/Users/AllUsersController')
const router = express.Router()

//Route used for get all users from de Db
router.get('/users/', getAllUsers)

module.exports = router