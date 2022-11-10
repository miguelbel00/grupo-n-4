const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { Role } = require("../database/models/");
const { User } = require("../database/models/");
const { ErrorObject } = require("../helpers/error");

const codificate = (data) => {
  const token = jwt.sign(data, process.env.SECRETORPRIVATEKEY);
  return token;
};

const decodificate = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

const verify = async (req = request, res = response, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new ErrorObject("No token provided", 403);
  }

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const { dataValues: user } = await User.findOne({ where: { id } });

    if (!user) {
      throw new ErrorObject(
        "The owner of this token does not exist anymore",
        403
      );
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ErrorObject("Your session has expired. Please relogin", 400);
  }
};

module.exports = {
  codificate,
  decodificate,
  verify,
};
