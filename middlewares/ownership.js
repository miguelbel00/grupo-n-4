const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require("../helpers/error");

module.exports = {
  ownership: catchAsync(async (req, res, next) => {
    try {

      if (req.user.id !== parseInt(req.params.id) && req.user.roleId !== 1)
        throw new ErrorObject('You dont have permission to access', 403);

      next();
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error ownerShip] - [Middleware - Autorization]: ${error.message}`
      );
      next(httpError);
    }
  })
}