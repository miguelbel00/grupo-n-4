const createHttpError = require('http-errors')
const { User } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')

//  get all users controller and specifics attributes return
module.exports = {
  getAllUsers: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll({attributes:['firstName','lastName','email','createdAt']})
      endpointResponse({
        res,
        message: 'Test retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving UserSerach] - [UserSearchController - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
