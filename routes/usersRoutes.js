const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");
const { getAllUsers } = require('../controllers/Users/userSearchController');
const { upload } = require('../helpers/imageService');
const { imageUpload } = require("../controllers/Users/imageUploadControllers");
const { ownership } = require('../middlewares/ownership');
const { verify } = require('../middlewares/JWT');
const { verifyUser } = require('../middlewares/verifyUser');
const validatorSchemas = require('../middlewares/validatorSchemas');
const { UserSchema } = require('../schemas/userValidatorSchema')




const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *        - firstName
 *        - lastname
 *        - email
 *        - password
 *       properties:
 *        firstName:
 *         type: string
 *        lastname:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *        avatar:
 *         type: string
 *        rolId:
 *         type: integer 
 *        createdAt:
 *         type: string
 *        updatedAt:
 *         type: string
 *        deletedAt:
 *         type: string
 *       example:
 *         firstName: Kenneth
 *         lastname: Castillo
 *         email: Kenneth@mail.com
 *         password: "123456"
 */



/**
 * @swagger
 * /users/{id}:
 *  put:
 *   tags: ["User"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: actualizar usuarios 
 *   description: Esta ruta es responsable de actualizar un usuario por id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id del usuario
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Users'
 *   responses:
 *    '200':
 *       description: usuario actualizado
 *    '403':
 *       description: fallo de auth
 *    '404':
 *       description: usuario no encontrados
 * 
*/
router.put('/users/:id',ownership, updateUser);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *   tags: ["User"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: buscar un usuario por id
 *   description: Esta ruta es responsable de mostrar el detalle de un usuario
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id del usuario
 *   responses:
 *    '200':
 *       description: Detalle de usuario
 *    '403':
 *       description: fallo de auth
 *    '404':
 *       description: usuario no encontrado
 * 
*/
router.put('/users/:id', validatorSchemas(UserSchema), ownership, updateUser)
router.get("/users/:id",ownership ,getById);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   tags: ["User"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: eliminar un usuario por id
 *   description: Esta ruta es responsable del eliminado logico de un usuario por id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id del usuario
 *   responses:
 *    '200':
 *       description: Usuario eliminado
 *    '403':
 *       description: fallo de auth
 *    '400':
 *       description: usuario no encontrado
 * 
*/
router.delete("/users/:id",ownership, deleteUser);

/**
 * @swagger
 * /users:
 *  get:
 *   tags: ["User"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Lista todos los usuarios
 *   description: Esta ruta es responsable de mostrar todos los registros de usuarios
 *   parameters:
 *     - in: query
 *       name: page
 *       schema: 
 *         type: integer
 *       required: true
 *   responses:
 *    '200':
 *       description: lista de usuarios
 *    '404':
 *       description: usuarios no encontrados
 * 
*/
router.get('/users', ownership,getAllUsers);
router.post('/image', upload.single('image'), imageUpload);

module.exports = router;

