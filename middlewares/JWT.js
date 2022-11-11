const { request, response } = require('express');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { Role } = require('../database/models/');
const { User } = require('../database/models/');
const { ErrorObject } = require('../helpers/error');

const codificate = (data) => {
    const token = jwt.sign(data, process.env.SECRETORPRIVATEKEY)
    return token
}

const decodificate = (token) => {
    const payload = jwt.decode(token)
    return payload;
}

const verify = async (req = request, res = response, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ErrorObject("No token provided", 403);
        }
        const token = authorization.split(' ')[1]
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
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
    codificate,
    decodificate,
    verify
}