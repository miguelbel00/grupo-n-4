const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");
const { ErrorObject } = require("../../helpers/error");
const { User } = require("../../database/models");

module.exports = {
  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const userId = await User.findOne({ where: { id } });

      if (!userId) {
        throw next(new ErrorObject(" Id not found ", 400));
      }

      endpointResponse({
        res,
        message: "result successfully",
        body: userId,
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
