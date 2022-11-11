const createHttpError = require('http-errors')
const { decodificate } = require('./JWT')
const { User } = require('../database/models')
const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require("../helpers/error");

module.exports = {
  Ownership: catchAsync(async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'];
      if (!token) throw new ErrorObject('No token provided', 404);

      const decoded = decodificate(token);
      const user = await User.findByPk(decoded.id, { password: 0 });

      if (decoded.id !== parseInt(req.params.id) && user.roleId !== 1)
        throw new ErrorObject('You dont have permission to access', 403);

      next();
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error ownership] - [updateUserController - PUT]: ${error.message}`
      );
      next(httpError);
    }
  })
}