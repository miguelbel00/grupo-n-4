const { request, response } = require("express");
const { catchAsync } = require("../../helpers/catchAsync");
const { Transaction } = require('../../database/models');
const { ErrorObject } = require("../../helpers/error");
const { endpointResponse } = require("../../helpers/success");
const createHttpError = require("http-errors");

module.exports = {
    getTransactionById: catchAsync(async (req = request, res = response, next) => {
        try {
            const { id } = req.params;

            const transaction = await Transaction.findOne({ where: { id } });
            if (!transaction) throw new ErrorObject('This transaction not exist', 404);

            endpointResponse({
                res,
                message: 'Transaction found',
                body: transaction
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error trying to get data] - [transactionsSearchOneController - GET]: ${error.message}`,
            )
            next(httpError)
        }
    })
}