const express = require('express')
const { createCategory } = require('../controllers/Category/categoryCreateController')
const { getAllCategory } = require('../controllers/Category/categorySearchController')
const { getCategoryById } = require('../controllers/Category/categorySearchOneController')
const { updateCategory } = require('../controllers/Category/categoryUpdateController')
const {ownership} = require('../middlewares/ownership')
const validatorSchemas = require('../middlewares/validatorSchemas');
const { CategorySchema } = require('../schemas/categoryValidatorSchema');


const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *        - name
 *        - description
 *       properties:
 *        name:
 *         type: string
 *        description:
 *         type: string
 *       example:
 *         name: Expense
 *         description: unaDescripcion
 */

/**
 * @swagger
 * /categories:
 *  post:
 *   tags: ["Category"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Registrar una Categoria
 *   description: Esta ruta es responsable de listar todas las categorias
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Categories'
 *   responses:
 *    '200':
 *     description: se registro una categoria correctamente
 *    '403':
 *      description: fallo de auth
 * 
 */
router.post('/categories',ownership ,validatorSchemas(CategorySchema), createCategory)
/**
 * @swagger
 * /categories:
 *  get:
 *   tags: ["Category"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Lista de categorias
 *   description: Esta ruta es responsable de registrar categorias
 *   responses:
 *    '200':
 *       description: lista de tareas
 *    '403':
 *       description: fallo de auth
 * 
*/

router.get('/categories',ownership ,getAllCategory)
/**
 * @swagger
 * /categories/{id}:
 *  get:
 *   tags: ["Category"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: buscar una categoria por id
 *   description: Esta ruta es responsable de mostrar el detalle una categoria
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id de la categoria
 *   responses:
 *    '200':
 *       description: Detalle de la categoria
 *    '403':
 *       description: fallo de auth
 *    '404':
 *       description: categoria no encontrada
 * 
*/

router.get('/categories/:id',ownership, getCategoryById)

/**
 * @swagger
 * /categories/{id}:
 *  put:
 *   tags: ["Category"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: actualizar categoria 
 *   description: Esta ruta es responsable de actualizar una categoria por id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id de la categoria
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Categories'
 *   responses:
 *    '200':
 *       description: categoria actualizada
 *    '403':
 *       description: fallo de auth
 *    '404':
 *       description: categoria no encontrada
 * 
*/
router.put('/categories/:id',ownership, validatorSchemas(CategorySchema),updateCategory)
module.exports = router
