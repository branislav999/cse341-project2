const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Course API',
        description: 'Holds information about users',
    },
    host: 'cse341-project2-a80q.onrender.com',
    // host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/users.js', './routes/lessons.js'];

swaggerAutogen(outputFile, endpointFiles, doc);

