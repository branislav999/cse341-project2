const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Course API',
        description: 'Holds information about users',
    },
    host: 'cse341-project2-a80q.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc);

