const swaggerJSDoc = require("swagger-jsdoc")
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API AlkyBank",
        version: "1.0.0",
        termsOfService: "http://localhost:3009/terms",
        contact: {
            "email": "team@gmail.com"
        }
    },
    servers: [
        {
            url: "http://localhost:3009/",
            description: "dev"
        }
    ],
    paths: {
        "/auth/login": {
            "post": {
                "summary": "Logueo de un usuario",
                "description": "Esta ruta es responsable de loguear un usuario",
                "tags": ["auth"],
                "requestBody": {
                    required: true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/login"
                            },
                            "examples": {
                                "login": {
                                    "value": {
                                        "email": "mati@mail.com",
                                        "password": "123456"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "logueado correctamente",
                    },
                    "404": {
                        "description": "error password or email not found"
                    }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            login: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        required: true
                    },
                    password: {
                        type: "string",
                        required: true
                    }
                }
            }
        }
    }
}

const swaggerOptions = {
    swaggerDefinition,
    apis: ["../routes/*.js"]
}
module.exports = swaggerJSDoc(swaggerOptions)
