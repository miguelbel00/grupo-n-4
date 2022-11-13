const express = require("express");
const {
  createTransaction,
} = require("../controllers/Transactions/transactionCreateController");
const { listTransactions } = require("../controllers/Transactions/transactionSearchController");
const { getTransactionById } = require("../controllers/Transactions/transactionsSearchOneController");
const { updateTransactionById } = require("../controllers/Transactions/transationsUpdateController");
const { deleteTransaction } = require("../controllers/Transactions/transactionsDeleteControllers");
const validatorSchemas = require('../middlewares/validatorSchemas');
const { TransactionSchema } = require('../schemas/transactionValidatorSchema')
const {ownership} = require('../middlewares/ownership')

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transactions:
 *       type: object
 *       required:
 *        - description
 *        - amount
 *        - userId
 *        - categoryId
 *        - date
 *       properties:
 *        description:
 *         type: string
 *        amount:
 *         type: float
 *        userId:
 *         type: integer
 *        categoryId:
 *         type: integer
 *        date:
 *         type: date
 *       example:
 *         description: investing
 *         amount: 300
 *         userId: 2
 *         categoryId: 1
 */


/**
 * @swagger
 * /transactions:
 *  get:
 *   tags: ["Transaction"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Mostrar todas las transacciones
 *   description: Esta ruta es responsable de listar todas las transacciones, tambien si se especifica un ID de usuario como parametro por query devuelve las transacciones que pertenecen a un usuario
 *   parameters:
 *     - in: query
 *       name: query
 *       schema:
 *         type: integer
 *       description: id de usuario
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *       required: true
 *       description: pagina
 *   responses:
 *    '200':
 *     description: Se obtuvieron todas las transacciones
 *    '403':
 *      description: fallo de auth
 *    '500':
 *      description: falta parametro query
 * 
 */
router.get("/transactions", listTransactions);


/**
 * @swagger
 * /transactions/{id}:
 *  get:
 *   tags: ["Transaction"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Mostrar una transaccion
 *   description: Esta ruta es responsable de mostrar una transaccion segun su id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id de la transacción
 *   responses:
 *    '200':
 *     description: Transacción encontrada
 *    '403':
 *      description: fallo de auth
 *    '404':
 *     description: Esta transacción no existe
 * 
 */
router.get("/transactions/:id", ownership,getTransactionById);


/**
 * @swagger
 * /transactions:
 *  post:
 *   tags: ["Transaction"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Registrar una transacción
 *   description: Esta ruta es responsable de registrar una transacción
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Transactions'
 *   responses:
 *    '200':
 *     description: Transacción registrada
 *    '403':
 *      description: fallo de auth
 * 
 */
router.post("/transactions", validatorSchemas(TransactionSchema), createTransaction);


/**
 * @swagger
 * /transactions/{id}:
 *  put:
 *   tags: ["Transaction"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Actualizar una transaccion
 *   description: Esta ruta es responsable de actualizar la transaccion cuyo ID sea especificado como parametro de ruta
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id de la transacción
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Transactions'
 *   responses:
 *    '200':
 *     description: Se actualizo la transaccion
 *    '403':
 *      description: fallo de auth
 *    '404':
 *      description: Esta transacción no existe
 * 
 */
router.put("/transactions/:id", ownership,validatorSchemas(TransactionSchema), updateTransactionById);


/**
 * @swagger
 * /transactions/{id}:
 *  delete:
 *   tags: ["Transaction"]
 *   "security": [{ "bearerAuth": [] }]
 *   summary: Eliminar Transacción
 *   description: Esta ruta es responsable de eliminar la transaccion cuyo ID sea especificado como parametro de ruta
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: id de la transacción
 *   responses:
 *    '200':
 *     description: Elimino la transacción
 *    '403':
 *      description: fallo de auth
 *    '404':
 *      description: Esta transacción no existe
 * 
 */
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;