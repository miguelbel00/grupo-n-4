const express = require('express');
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { createUser } = require('../controllers/Users/createUserControllers');
const { schemaValidator } = require('../middlewares/validatorSchema');
const { createUserSchema } = require('../schemas/users');

const router = express.Router();

router.post('/users', schemaValidator(createUserSchema), createUser);
router.put('/users/:id', updateUser)

module.exports = router