const createHttpError = require("http-errors");
const { User } = require("../../database/models");
const { catchAsync } = require("../../helpers/catchAsync");
const bcryptjs = require('bcryptjs');
const { ErrorObject } = require('../../helpers/error');
const { endpointResponse } = require("../../helpers/success");

module.exports = {
    updateUser: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params
            let { firstName, lastname, email, password, avatar } = req.body

            const user = await User.findByPk(id)
            if (!user) throw new ErrorObject('The user not exists', 404)

            if (password) {
                const salt = bcryptjs.genSaltSync();
                password = bcryptjs.hashSync(password, salt);
            }

            const data = {
                firstName,
                lastname,
                email,
                password,
                avatar
            }

            const response = await User.update(data, { where: { id } })

            endpointResponse({
                res,
                message: 'User Update',
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error User update] - [UserUpdateController - PUT]: ${error.message}`,
            )
            next(httpError)
        }
    }),
}
