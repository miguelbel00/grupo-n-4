const { Router } = require('express');
const { getDataTransaction } = require('../controllers/Transactions/transactionDataControllers');

const router = Router();

router.get('/transactions/:id', getDataTransaction)

module.exports = router;