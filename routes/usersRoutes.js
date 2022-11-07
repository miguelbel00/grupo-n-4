const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { createUser } = require('../controllers/Users/userCreateControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");
const { getAllUsers } = require('../controllers/Users/userSearchController')

const router = Router();

router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.get("/users/:id", getById);
router.put("/users/:id", updateUser);
router.delete("/users/:id",deleteUser);
router.get('/users', getAllUsers)

module.exports = router;

