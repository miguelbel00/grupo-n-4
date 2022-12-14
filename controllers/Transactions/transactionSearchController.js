const createHttpError = require("http-errors");
const { Transaction } = require("../../database/models");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
const { ErrorObject } = require("../../helpers/error");
const { Op } = require("sequelize");
const {encode} = require('../../middlewares/JWT')
const {
  paginate,
} = require("../../middlewares/paginateTransactionsMiddleware");

module.exports = {
  listTransactions: catchAsync(async (req, res, next) => {
    try {
      //get the query params

      const {
        query,
        description = 0,
        page = 0,
        limit = 10,
        order_by,
        order_direction = "asc",
      } = req.query;

      if (query !== req.user.id.toString() && req.user.roleId !== 1) throw new ErrorObject("you don't have permissions", 403)

      if (query === req.user.id.toString()) {
        const transactions = await Transaction.findAll({ where: { userId: req.user.id } })

        return endpointResponse({
          res,
          message: 'Transactions found successfully',
          body: transactions
        })
      }

      if (description === page) {
        throw new ErrorObject("the params query not found", 404);
      }

      let search = {};
      let order = [];

      if (description) {
        search = {
          where: { name: { [Op.like]: `%${description}%` } },
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
        body: encode({payload:transactions}),
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
