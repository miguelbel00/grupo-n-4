const { Router } = require("express");
const { updateUser } = require("../controllers/Users/userUpdateControllers");
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");

const router = Router();

router.get("/users/:id", getById);
router.put("/users/:id", updateUser);
router.delete("/users/:id",deleteUser);

module.exports = router;
