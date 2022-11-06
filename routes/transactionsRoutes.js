const express = require("express");
const {
  createTransaction,
} = require("../controllers/Transactions/transactionCreateController");
const {
  getAllTransactions,
} = require("../controllers/Transactions/transactionSearchController");
const {
  getTransactionById,
} = require("../controllers/Transactions/transactionsSearchOneController");
const router = express.Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getAllTransactions);
router.get("/transactions/:id", getTransactionById);

module.exports = router;
