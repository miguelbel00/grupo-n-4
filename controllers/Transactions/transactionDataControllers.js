const { request, response } = require("express");
const { catchAsync } = require("../../helpers/catchAsync");
const { Transaction } = require('../../database/models');
const { ErrorObject } = require("../../helpers/error");
const { endpointResponse } = require("../../helpers/success");

module.exports = {
    getDataTransaction: catchAsync(async (req = request, res = response, next) => {
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
                `[Error Get Transaction Data] - [transactionDataControllers - GET]: ${error.message}`,
            )
            next(httpError)
        }
    })
}