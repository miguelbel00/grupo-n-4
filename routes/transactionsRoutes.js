const express = require('express')
const { getAllTransactions } = require('../controllers/Transactions/transactionSearchController')

const router = express.Router()

router.get('/transactions', getAllTransactions)

module.exports = router