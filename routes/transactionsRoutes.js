const express = require("express");
const {
  createTransaction,
} = require("../controllers/Transactions/transactionCreateController");
const { listTransactions } = require("../controllers/Transactions/transactionSearchController");
const { getTransactionById } = require("../controllers/Transactions/transactionsSearchOneController");
const { updateTransactionById } = require("../controllers/Transactions/transationsUpdateController");
const { deleteTransaction }= require("../controllers/Transactions/transactionsDeleteControllers");
const validatorSchemas = require('../middlewares/validatorSchemas');
const { TransactionSchema } = require('../schemas/transactionValidatorSchema')


const router = express.Router();

router.get("/transactions", listTransactions);
router.get("/transactions/:id", getTransactionById);
router.post("/transactions", createTransaction);
router.put("/transactions/:id", updateTransactionById);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;