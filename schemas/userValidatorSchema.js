const { checkSchema } = require('express-validator');


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
  },
  lastname: {
    isLength: {
      errorMessage: 'Last name should be at least 2 chars long',
      options: { min: 3 },
    },
  },
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Invalid Email',
    },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 5 chars long',
      options: { min: 5 },
    },
  },
  avatar: {
    isURL: {
      errorMessage: 'Invalid URL',
    },
  },
});

module.exports = {
  UserSchema,
};
