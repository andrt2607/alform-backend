const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alform API',
      version: '1.0.0',
      description: 'Custom clone google form',
    //   termsOfService: "http://example.com/terms/",
      contact: {
        name: "Alif Andarta",
        email: "alifaku7@gmail.com",
      },
    },
    servers: [
        {
          url: "http://localhost:3000/api/v1",
          description: "Alform API Backend",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
  },
  apis: ['./routes/*.js'],
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//   }, // Ganti dengan jalur ke file-file rute Anda
};

// options.components = {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//   };

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
