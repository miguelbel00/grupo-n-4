const express = require("express");
const { getById } = require("../controllers/users/userById");
const { createUser } = require("../controllers/users/createUser");

const router = express.Router();

router.post("/", createUser);
router.get("/users/:id", getById);

module.exports = router;
