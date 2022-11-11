const createHttpError = require('http-errors')
const { Category } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')
const { ErrorObject } = require('../../helpers/error')

module.exports = {
    updateCategory: catchAsync(async (req, res, next) => {
      try {
        const{ id} = req.params
        const {description,name} = req.body
        if (!id || !description || !name) throw new ErrorObject('Missing or wrong parameters',404)
        const categoryFound = await Category.findByPk(id)
        if (categoryFound==null) throw new ErrorObject('Category not found',404)
        const response = await categoryFound.update({description,name})
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