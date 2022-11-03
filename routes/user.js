const express = require('express');
const { createUser } = require('../controllers/Users/createUserControllers');
const { schemaValidator } = require('../middlewares/validatorSchema');
const { createUserSchema } = require('../schemas/users');

const router = express.Router();

router.post('/', schemaValidator(createUserSchema), createUser);  // schemaValidator(createUser)

module.exports = router;