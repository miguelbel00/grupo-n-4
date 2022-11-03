const express = require('express')
const { get, post } = require('../controllers/index')
const { TestsSchema } = require('../schemas/testsValidatorSchema')
const validatorSchemas = require('../middlewares/validatorSchemas')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.post('/test', validatorSchemas(TestsSchema), post)

module.exports = router
