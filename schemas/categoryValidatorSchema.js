const { checkSchema } = require('express-validator');


/* A validation schema for the category model. */
const CategorySchema = checkSchema(
  {
  name: {
    isString:{
      errorMessage: 'Should be String',
    },
    isLength: {
      errorMessage: 'Name should be at least 5 chars long',
      options: { min: 5, max: 20},
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
  CategorySchema,
};
