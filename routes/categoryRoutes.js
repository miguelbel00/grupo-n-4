const express = require('express')
const { createCategory } = require('../controllers/Category/categoryCreateController')
const { getAllCategory } = require('../controllers/Category/categorySearchController')
const { getCategoryById } = require('../controllers/Category/categorySearchOneController')
const { updateCategory } = require('../controllers/Category/categoryUpdateController')
const validatorSchemas = require('../middlewares/validatorSchemas');
const { CategorySchema } = require('../schemas/categoryValidatorSchema');


const router = express.Router()

router.post('/categories', validatorSchemas(CategorySchema),  createCategory);
router.get('/categories', getAllCategory);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', validatorSchemas(CategorySchema), updateCategory);


module.exports = router
