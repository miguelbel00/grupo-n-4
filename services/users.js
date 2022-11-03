const { User } = require('../database/models');
const { ErrorObject } = require('../helpers/error');

exports.createUser = async (body) => {
  try {   
    const newUser = await User.create(body)
    if (!newUser) {
      throw new ErrorObject('User creation failed', 404)
    }
    return newUser
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}