const express = require('express');
const { getTransactionById } = require('../controllers/Transactions/transactionsSearchOneController');

const router = express.Router();

router.get('/transactions/:id', getTransactionById)

module.exports = router;