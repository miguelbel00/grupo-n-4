const createHttpError = require('http-errors')
const { Category } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')

module.exports = {
    createCategory: catchAsync(async (req, res, next) => {
      try {
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