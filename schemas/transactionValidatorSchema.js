const { checkSchema } = require('express-validator');


const TransactionSchema = checkSchema(
  {
  description: {
    isLength: {
      errorMessage:
        'Description must be at least 20 chars long and max 50',
      options: { min: 20, max: 99},
    },
  },
  amount: {
    isLength: {
      errorMessage: 
        'Amount must be at least 1 chars long and max 10',
      options: { min: 1 },
    },
  },
  date: {
    isLength: {
      errorMessage:
        'Date must be at least 1 chars long and max 10',
      options: { min: 1 },
    },
  },
});

module.exports = {
  TransactionSchema,
};
