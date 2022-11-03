const express = require('express');
var router = express.Router();
const user = require('../controllers/Users/createUserControllers');

router.post('/', user.create);

module.exports = router;