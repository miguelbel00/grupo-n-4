const { validationResult } = require('express-validator');


/**
 * It takes a schema as an argument, and returns an array of the schema and a middleware function that
 * validates the schema
 * @param schema - The schema that you want to validate.
 * @returns An array with two elements. The first element is the schema, and the second element is a
 * function that takes in req, res, and next.
 */
const validatorSchemas = (schema) => {
  return [
    schema,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
module.exports = validatorSchemas;
