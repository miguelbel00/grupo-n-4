const createHttpError = require("http-errors");
const { Transaction } = require("../../database/models");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
const { ErrorObject } = require("../../helpers/error");
const { Op } = require("sequelize");
const { paginate } = require("../../middlewares/paginateMiddleware");

module.exports = {
  listTransactions: catchAsync(async (req, res, next) => {
    try {
      //get the query params

      const {
        q = 0,
        page = 0,
        limit = 10,
        order_by,
        order_direction = "asc",
      } = req.query;

      if (q === page) {
        throw new ErrorObject("the params query not found", 404);
      }

      let search = {};
      let order = [];

      if (q) {
        search = {
          where: { name: { [Op.like]: `%${q}%` } },
        };
      }

      //add the order parameters to the order

      if (order_by && order_direction) {
        order.push([order_by, order_direction]);
      }

      // transform function that can be passed to the paginate method

      const transform = (records) => {
        return records.map((Transaction) => {
          return {
            Transaction,
          };
        });
      };

      // paginate method that takes in the model, limit, search object, order and transform

      const transactions = await paginate(
        Transaction,
        page,
        limit,
        search,
        order,
        transform
      );

      endpointResponse({
        res,
        message: "Transactions retrieved successfully",
        body: transactions,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions] - [transactions - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
