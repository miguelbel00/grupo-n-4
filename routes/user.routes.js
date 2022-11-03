const express = require("express")
const {getById} = require("../controllers/users/userById")

const router = express.Router();

router.get("/users/:id", getById);

module.exports = router