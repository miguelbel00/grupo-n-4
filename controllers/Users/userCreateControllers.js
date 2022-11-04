const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const { endpointResponse } = require('../../helpers/success')
const { ErrorObject } = require('../../helpers/error');
const { catchAsync } = require('../../helpers/catchAsync')
const { User } = require('../../database/models');

module.exports = {
  createUser: catchAsync(async (req, res, next) => {
    try {

      // verificate existent email
      const existentUser = await User.findOne({ where: { email: req.body.email } })
      if (existentUser) throw new ErrorObject('That email is already in use', 404)

      // encrypt pass
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPass;
      req.body.roleId = 1;

      // create user
      const newUser = await User.create(req.body);
      if (!newUser) throw new ErrorObject('User creation failed', 404)
      
      endpointResponse({
        res,
        message: 'User created',
        body: newUser,
      })

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating User] - [userCreateControllers - POST]: ${ error.message }`,
      )
      next(httpError)
    }
  })
}