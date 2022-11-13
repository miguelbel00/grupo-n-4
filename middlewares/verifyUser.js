const jwt = require('jsonwebtoken');
const { ErrorObject } = require('../helpers/error');
const createHttpError = require("http-errors");
const { User } = require('../database/models');


const verifyUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findOne({
            where: { id: decoded.id },
        });
       
        if (!user) {
            throw new ErrorObject("The owner of this token does not exist anymore",403
            );
        }

        req.user = user;
        next();

    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error verify User] - [verifyUser- Middleware]: ${error.message}`
        );
        next(httpError);
    }
};



module.exports = {
    verifyUser,
}
