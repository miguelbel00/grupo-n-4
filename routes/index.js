const express = require('express')
const { get, post } = require('../controllers/index')
const validatorSchemas = require('../middlewares/validatorSchemas')
const { TransactionSchema } = require('../schemas/transactionValidatorSchema')


const router = express.Router()

// example of a route with index controller get function
router.get('/', get);
//router.post('/register', validatorSchemas(TransactionSchema), post);

module.exports = router
