const createHttpError = require('http-errors')
const { Transaction } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  getTransactions: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const admin = await isAdmin(id);

            if(!isNaN(id) && admin){

                const response = await Transaction.findAll();
                endpointResponse({
                    res,
                    message: 'Transaction successfully',
                    body: response,
                });
                if(response.length){
                    endpointResponse({
                        res,
                        message: 'Transaction successfully',
                        body: response,
                    });
                }else{
                    throw Error('Tranasaction not found');
                }

            }else{
                throw Error('You are not a admin');
            }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error categories search] - [categorySearchController - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
