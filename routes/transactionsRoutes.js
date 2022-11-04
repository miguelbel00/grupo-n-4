const express = require('express')
const { getAllTransactions } = require('../controllers/Transactions/transactionSearchController')
const { getTransactionById } = require('../controllers/Transactions/transactionsSearchOneController');
const router = express.Router()

router.get('/transactions', getAllTransactions)
router.get('/transactions/:id', getTransactionById)

module.exports = router