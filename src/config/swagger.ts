import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Projeto',
            version: '1.0.0',
            description: 'Descrição do projeto',
        },
        servers: [
            {
                url: process.env.API_URL || `http://localhost:${process.env.PORT || 8080}`,
                description: process.env.API_URL ? 'Servidor de produção' : 'Servidor de desenvolvimento',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: "Token JWT obtido no endpoint de login"
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID do usuário'
                        },
                        name: {
                            type: 'string',
                            description: 'Nome do usuário'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário'
                        },
                        role: {
                            type: 'string',
                            description: 'Cargo/Perfil do usuário'
                        }
                    }
                },
                RegisterSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nome do usuário'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário'
                        },
                        password: {
                            type: 'string',
                            description: 'Senha do usuário'
                        },
                        phone: {
                            type: 'string',
                            description: 'Telefone do usuário'
                        },
                        cpf: {
                            type: 'string',
                            description: 'CPF do usuário'
                        },
                        nameCompany: {
                            type: 'string',
                            description: 'Nome da empresa'
                        }
                    },
                    required: ['name', 'email', 'password', 'phone', 'cpf', 'nameCompany']
                },
                LoginSchema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário'
                        },
                        password: {
                            type: 'string',
                            description: 'Senha do usuário'
                        }
                    },
                    required: ['email', 'password']
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Mensagem de sucesso/falha'
                        },
                        token: {
                            type: 'string',
                            description: 'Token JWT'
                        }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            description: "Tipo do erro",
                        },
                        message: {
                            type: "string",
                            description: "Mensagem descritiva do erro",
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

export const specs = swaggerJsdoc(options);
