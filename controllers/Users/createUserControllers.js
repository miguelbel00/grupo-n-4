const createHttpError = require('http-errors')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')
const { createUser } = require('../../services/users');

module.exports = {
  create: catchAsync(async (req, res, next) => {
    try {
      const newUser = createUser(req.body);
      endpointResponse({
        res,
        message: 'User created',
        body: newUser,
      })

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating User] - [createUserControllers - POST]: ${ error.message }`,
      )
      next(httpError)
    }
  }),
}