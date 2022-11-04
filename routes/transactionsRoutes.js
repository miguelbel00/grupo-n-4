const express = require("express");
const {
  getAllTransactions,
} = require("../controllers/Transactions/transactionSearchController");
const {
  updateTransactionById,
} = require("../controllers/Transactions/transationsUpdateController");

const router = express.Router();

router.get("/transactions", getAllTransactions);
router.put("/transactions/:id", updateTransactionById);

module.exports = router;
