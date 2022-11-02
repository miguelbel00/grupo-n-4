const express = require('express')
const { get, post } = require('../controllers/index')
const { requestValidation } = require('../middlewares')
const {validatorRegister} = require('../schemas')


const router = express.Router()

// example of a route with index controller get function
router.get('/', get);
router.post('/register', requestValidation(validatorRegister), post);

module.exports = router
