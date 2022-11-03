const express = require('express')
const { createCategory } = require('../controllers/Category/categoryCreateController')
const { getAllCategory } = require('../controllers/Category/categorySearchController')
const { getCategoryById } = require('../controllers/Category/categorySearchOneController')


const router = express.Router()

router.post('/categories', createCategory)
router.get('/categories', getAllCategory)
router.get('/categories/:id', getCategoryById)

module.exports = router