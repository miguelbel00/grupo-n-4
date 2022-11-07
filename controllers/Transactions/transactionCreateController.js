const createHttpError = require('http-errors')
const { Transaction } = require('../../database/models')
const { endpointResponse } = require('../../helpers/success')
const { catchAsync } = require('../../helpers/catchAsync')

module.exports = {
    createTransaction: catchAsync(async (req, res, next) => {
      try {
        const response = await Transaction.create({
            description: req.body.description,
            amount: req.body.amount,
            userId: req.body.userId,
            categoryId: req.body.categoryId,
            date: new Date()
          })
        endpointResponse({
          res,
          message: 'Transaction created',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error create Transaction] - [transactionCreateController - POST]: ${error.message}`,
        )
        next(httpError)
      }
    }),
  }