const express = require("express");
const {
  createTransaction,
} = require("../controllers/Transactions/transactionCreateController");
const {
  listTransactions,
} = require("../controllers/Transactions/transactionSearchController");
const {
  getTransactionById,
} = require("../controllers/Transactions/transactionsSearchOneController");

const {
  updateTransactionById,
} = require("../controllers/Transactions/transationsUpdateController");
const {
  deleteTransaction,
} = require("../controllers/Transactions/transactionsDeleteControllers");
const{verify}= require("../middlewares/JWT");
const{verifyUser}=require("../middlewares/verifyUser");

const router = express.Router();

router.put("/transactions/:id",[verify, verifyUser], updateTransactionById);
router.post("/transactions",[verify, verifyUser], createTransaction);
router.get("/transactions",[verify, verifyUser], listTransactions);
router.get("/transactions/:id",[verify, verifyUser], getTransactionById);
router.delete("/transactions/:id",[verify, verifyUser], deleteTransaction);

module.exports = router;
