const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Course API',
        description: 'Holds information about users',
    },
    host: 'cse341-project2-a80q.onrender.com',
    // host: 'localhost:5000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/users.js']

swaggerAutogen(outputFile, endpointFiles, doc);

