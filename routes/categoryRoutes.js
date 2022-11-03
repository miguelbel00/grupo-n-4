const express = require('express')
const { createCategory } = require('../controllers/Category/categoryCreateController')
const router = express.Router()

router.post('/categories', createCategory)


module.exports = router