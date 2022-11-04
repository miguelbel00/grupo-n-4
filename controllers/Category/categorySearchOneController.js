const createHttpError = require('http-errors')
const { Category } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const {ErrorObject } = require('../../helpers/error')
const { catchAsync } = require('../../helpers/catchAsync')

module.exports = {
    getCategoryById: catchAsync(async (req, res, next) => {
      try {
        const response = await Category.findOne({ where: { id: req.params.id } });
        if(!response) throw new ErrorObject('Category not found', 404)
        endpointResponse({
          res,
          message: 'Category retrieved successfully',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error retrieving category - [categorySearchOneController - GET]: ${error.message}`,
        )
        next(httpError)
      }
    }),
  }