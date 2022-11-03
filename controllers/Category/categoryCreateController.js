const createHttpError = require('http-errors')
const { Category } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
    createCategory: catchAsync(async (req, res, next) => {
      try {
        //called to the db and only return specifics attributes
        const response = await Category.create({
            name: req.body.name,
            description: req.body.description
          })
        endpointResponse({
          res,
          message: 'Category created',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error create category] - [categoryCreateController - POST]: ${error.message}`,
        )
        next(httpError)
      }
    }),
  }