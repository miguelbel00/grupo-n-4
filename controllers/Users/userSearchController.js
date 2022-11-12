const createHttpError = require("http-errors");
const { User } = require("../../database/models");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
const { ErrorObject } = require("../../helpers/error");
const { Op } = require("sequelize");
const { paginate } = require("../../middlewares/paginateUsersMiddleware");

module.exports = {
  getAllUsers: catchAsync(async (req, res, next) => {
    try {
      //get the query params

      const { email = null, page = null, limit = 10 } = req.query;

      if (email === page) {
        throw new ErrorObject("the params query not found", 404);
      }

      let search = {};

      if (email) {
        search = {
          where: { email: { [Op.like]: `%${email}%` } },
        };
      }
      // transform function that can be passed to the paginate method

      const transform = (records) => {
        return records.map((User) => {
          return {
            User,
          };
        });
      };

      // paginate method that takes in the model, limit, search object, order and transform

      const listUsers = await paginate(User, page, limit, search, transform);

      endpointResponse({
        res,
        message: "Users  retrieved successfully",
        body: listUsers,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Users] - [getAllUsers-Pagination - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
