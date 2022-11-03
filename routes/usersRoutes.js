const { Router } = require('express');
const { updateUser } = require('../controllers/Users/userUpdateControllers');

const router = Router();

router.put('/users/:id', updateUser)

module.exports = router