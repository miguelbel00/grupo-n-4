const express = require('express')
const { createCategory } = require('../controllers/Category/categoryCreateController')
const { getAllCategory } = require('../controllers/Category/categorySearchController')

const router = express.Router()

router.post('/categories', createCategory)
router.get('/categories', getAllCategory)

module.exports = router