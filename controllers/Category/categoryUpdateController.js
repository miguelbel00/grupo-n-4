const createHttpError = require('http-errors')
const { Category } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')
const { ErrorObject } = require('../../helpers/error')

module.exports = {
    updateCategory: catchAsync(async (req, res, next) => {
      try {
        const data = req.body
        const category = await Category.findOne({ where: { id: req.params.id } });
        if(!category) throw new ErrorObject("category not found", 404)
        const response = await Category.update(data,{
          where: {
            id: req.params.id 
          }
        })
        endpointResponse({
          res,
          message: 'Category Update',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error category update] - [categoryUpdateController - PUT]: ${error.message}`,
        )
        next(httpError)
      }
    }),
  }