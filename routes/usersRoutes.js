const { Router } = require("express");
const { updateUser } = require("../controllers/Users/userUpdateControllers");
const { getById } = require("../controllers/Users/userByIdcontrollers");

const router = Router();

router.get("/users/:id", getById);
router.put("/users/:id", updateUser);

module.exports = router;
