const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { createUser } = require('../controllers/Users/userCreateControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");
const { getAllUsers } = require('../controllers/Users/userSearchController')
const validatorSchemas = require('../middlewares/validatorSchemas');
const { UserSchema } = require('../schemas/userValidatorSchema')


const router = Router();

router.post('/users', validatorSchemas(UserSchema), createUser);
router.put('/users/:id', validatorSchemas(UserSchema), updateUser)
router.get("/users/:id", getById);
router.put("/users/:id", validatorSchemas(UserSchema), updateUser);
router.delete("/users/:id",deleteUser);
router.get('/users', getAllUsers)

module.exports = router;

