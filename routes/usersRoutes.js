const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { createUser } = require('../controllers/Users/createUserControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { schemaValidator } = require('../middlewares/validatorSchema');
const { createUserSchema } = require('../schemas/users');

const router = Router();

router.post('/users', schemaValidator(createUserSchema), createUser);
router.put('/users/:id', updateUser)
router.get("/users/:id", getById);

module.exports = router;
