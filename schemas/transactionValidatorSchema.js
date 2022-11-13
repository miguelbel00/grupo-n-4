const { checkSchema } = require('express-validator');


/* Validating the input fields. */
const TransactionSchema = checkSchema(
  {
  description: {
    isLength: {
      errorMessage:
        'Description must be at least 20 chars long and max 50',
      options: { min: 4, max: 200},
    },
    exists: {
      errorMessage: 'Description is required',
    },
  },
  amount: {
    isLength: {
      errorMessage: 
        'Amount must be at least 1 chars long and max 10',
      options: { min: 1 },
    },
    exists: {
      errorMessage: 'Amount is required',
    },
  }
});

module.exports = {
  TransactionSchema,
};
