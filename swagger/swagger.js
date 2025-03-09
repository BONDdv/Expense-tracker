const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");




const swaggerDefinition = {
    openapi: "3.0.0", 
    info: {
        title: "Expense Tracker API", 
        version: "1.0.0", 
        description: "This is a sample API for user authentication and management expense tracker using Swagger and Express", 
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 5000}`,
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {  
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT", 
                description: "Enter JWT token in format: Bearer <token>",
            },
        },
    },
    security: [
        {
            BearerAuth: [],  
        },
    ],
};


const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
