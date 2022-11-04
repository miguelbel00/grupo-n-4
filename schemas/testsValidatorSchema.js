const { checkSchema } = require('express-validator');


/* Validating the input. */
const TestsSchema = checkSchema(
  {
  name: {
    isLength: {
      errorMessage: 'Name should be at least 5 chars long',
      options: { min: 5, max: 20 },
    },
    exists: {
      errorMessage: 'Name is required',
    },
  },
});

module.exports = {
  TestsSchema,
};
