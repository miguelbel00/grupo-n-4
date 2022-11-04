const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Category.findAll()
      endpointResponse({
        res,
        message: 'Category retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description} = req.body;
      const newCategory = await Category.create({
        name,
        description
      })
      endpointResponse({
        res,
        message: 'Category retrieved successfully',
        body: newCategory,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
