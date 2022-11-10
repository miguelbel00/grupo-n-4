const { checkSchema } = require('express-validator');



const LoginSchema = checkSchema(
  {
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
  LoginSchema,
}
