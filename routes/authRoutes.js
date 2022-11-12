const express = require('express')
const { loginUser } = require('../controllers/auth/loginController');
const { createUser } = require('../controllers/Users/userCreateControllers');
const validatorSchemas = require('../middlewares/validatorSchemas');
const { UserSchema } = require('../schemas/userValidatorSchema')
const { LoginSchema } = require('../schemas/authValidatorSchema')

const router = express.Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    in: header
 *    name: Authorization
 *    description: Bearer token
 *    required: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *       example:
 *         email: mati@mail.com
 *         password: "123456"
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 */
/**
 * @swagger
 * /auth/login:
 *  post:
 *   tags:
 *   - Auth
 *   summary: Logueo de un usuario
 *   description: Esta ruta es responsable de loguear un usuario
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/login'
 *   responses:
 *    '200':
 *     description: logueado correctamente
 *    '404':
 *     description: error password or email not found
 * 
 */
router.post('/auth/register',  validatorSchemas(UserSchema), createUser);
router.post('/auth/login', validatorSchemas(LoginSchema), loginUser)

module.exports = router
