const { check } = require('express-validator');



const validatorRegister = [
  check('firstName')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Name is required'),
  check('lastname')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Last name is required'),
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Email is required'),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage('Password is required'),
  check('avatar')
    .exists()
    .notEmpty()
    .withMessage('Avatar is required'),
];

module.exports = {
  validatorRegister
};