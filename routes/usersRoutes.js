const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { createUser } = require('../controllers/Users/userCreateControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");

const router = Router();

router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.get("/users/:id", getById);

module.exports = router;
