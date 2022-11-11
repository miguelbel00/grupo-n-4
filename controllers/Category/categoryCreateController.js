const createHttpError = require("http-errors");
const { Category } = require("../../database/models");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
  createCategory: catchAsync(async (req, res, next) => {
    try {
      const { name, description } = req.body;
      if (typeof name !== "string" || typeof description !== "string") {
        throw new ErrorObject("missing or wrong parameters", 404);
      }
      const response = await Category.create({name,description});
      endpointResponse({
        res,
        message: "Category created",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error create category] - [categoryCreateController - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
