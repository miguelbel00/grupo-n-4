const { Router } = require('express');
const { getTransactionById } = require('../controllers/Transactions/transactionsSearchOneController');

const router = Router();

router.get('/transactions/:id', getTransactionById)

module.exports = router;