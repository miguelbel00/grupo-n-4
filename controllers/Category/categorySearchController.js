const createHttpError = require('http-errors')
const { Category } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')

module.exports = {
    getAllCategory: catchAsync(async (req, res, next) => {
      try {
        const response = await Category.findAll();
        endpointResponse({
          res,
          message: 'Categories Searched',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error categories search] - [categorySearchController - GET]: ${error.message}`,
        )
        next(httpError)
      }
    }),
  }