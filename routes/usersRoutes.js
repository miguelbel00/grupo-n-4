const { Router } = require('express');
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { createUser } = require('../controllers/Users/createUserControllers');
const { schemaValidator } = require('../middlewares/validatorSchema');
const { createUserSchema } = require('../schemas/users');

const router = Router();

router.put('/users/:id', updateUser)
router.post('/', schemaValidator(createUserSchema), createUser);


module.exports = router