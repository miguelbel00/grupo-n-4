const { checkSchema } = require('express-validator');


/* Validating the input data. */
const RoleSchema = checkSchema(
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
  description: {
    isLength: {
      errorMessage: 'Description should be at least 5 chars long',
      options: { min: 5, max:50 },
    },
    exists: {
      errorMessage: 'Description is required',
    },
  },
});

module.exports = {
  RoleSchema,
};
