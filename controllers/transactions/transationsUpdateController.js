const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");
const { ErrorObject } = require("../../helpers/error");
const { Transaction } = require("../../database/models/Transaction");

module.exports = {
  updateTransactionById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const transactionById = await Transaction.findOne({ where: { id } });

      if (!transactionById) {
        throw next(new ErrorObject(" transaction by Id not found ", 404));
      }

      await transactionById.update(req.body);

      endpointResponse({
        res,
        message: "result successfully",
        body: transactionById,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
