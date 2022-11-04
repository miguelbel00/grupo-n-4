/* A validation schema for the user model. */
exports.createUserSchema = {
  firstName: {
    isString: { errorMessage: 'firstName is not a string' },
    exists: {
      errorMessage: 'firstName cannot be NULL',
      options: { checkFalsy: true },
    },
  },
  lastname: {
    isString: { errorMessage: 'lastname is not a string' },
    exists: {
      errorMessage: 'lastname cannot be NULL',
      options: { checkFalsy: true },
    },
  },
  email: {
    isString: { errorMessage: 'email is not a string' },
    isEmail: { errorMessage: 'invalid email' },
    exists: {
      errorMessage: 'email cannot be NULL',
      options: { checkFalsy: true },
    },
  },
  password: {
    isString: { errorMessage: 'password is not a string' },
    exists: {
      errorMessage: 'password cannot be NULL',
      options: { checkFalsy: true },
    },
    // isStrongPassword: true,
    errorMessage: 'weak password',
  },

}