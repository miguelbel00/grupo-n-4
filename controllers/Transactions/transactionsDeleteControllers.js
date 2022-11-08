const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");
const { ErrorObject } = require("../../helpers/error");
const { Transaction } = require("../../database/models");


module.exports = {
    deleteTransaction: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findByPk(id);

            if (!transaction)throw new ErrorObject('Transaction not found',400)
                const responce = await Transaction.destroy({
                    where: { id }
                })
                endpointResponse({
                    res,
                    message: "Transaction successfully deleted",
                    body: responce,
                });
            

        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error deleted transaction] - [transactionDeleteControllers - DELETE]: ${error.message}`
            );
            next(httpError);
        }

    })
};
