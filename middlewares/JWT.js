const jwt = require('jsonwebtoken');
const { ErrorObject } = require('../helpers/error');
const dotenv = require('dotenv');
const createHttpError = require('http-errors');
dotenv.config()

const encode = (data) => {
    const token = jwt.sign(data, process.env.SECRETORPRIVATEKEY)
    return token
}

const decode = (token) => {
    const payload = jwt.decode(token)
    return payload;
}

const verify = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ErrorObject("Token is required", 403);
        }
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        next()
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error verify token] - [JWT - Middleware]: ${error.message}`
        );
        next(httpError);
    }
}

module.exports = {
    encode,
    decode,
    verify
}