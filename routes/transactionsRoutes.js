const express = require('express')
// const { get } = require('../controllers/index')
const { getTransactions } = require('../controllers/Transactions')

const router = express.Router()

router.get('/transactions', getTransactions)


module.exports = router