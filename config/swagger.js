const path = require('path')
exports.configSwagger = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Wallet',
        description: 'Api de la aceleración de Alkemy',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3009/',
          description: 'dev',
        },
      ],
    },
    apis: [`${path.join(__dirname, '../routes/*.js')}`],
  }