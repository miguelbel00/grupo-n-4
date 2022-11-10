const { checkSchema } = require('express-validator');


/* A schema for validating the user input. */
const UserSchema = checkSchema(
  {
  firstName: {
    isUppercase: {
      negated: true,
    },
    isLength: {
      errorMessage: 'First name should be at least 2 chars long',
      options: { min: 3 },
    },
    exists: {
      errorMessage: 'First name is required',
    },
  },
  lastname: {
    isLength: {
      errorMessage: 'Last name should be at least 2 chars long',
      options: { min: 3 },
    },
    exists: {
      errorMessage: 'Last name is required',
    },
  },
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Invalid Email',
    },
    normalizeEmail: true,
    exists: {
      errorMessage: 'Email is required',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 5 chars long',
      options: { min: 5 },
    },
    exists: {
      errorMessage: 'Password is required',
    },
  },
});

module.exports = {
  UserSchema,
};
