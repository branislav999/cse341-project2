const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Course API',
        description: 'Holds information about users',
    },
    host: 'cse341-joqm.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/contacts.js']

swaggerAutogen(outputFile, endpointFiles, doc);

