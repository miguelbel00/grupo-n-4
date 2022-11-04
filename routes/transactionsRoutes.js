const { Router } = require("express");
const {
  updateTransactionById,
} = require("../controllers/transactions/transationsUpdateController");

const router = Router();

router.put("/transactions/:id", updateTransactionById);

module.exports = router;
