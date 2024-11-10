const express = require('express');
const app = express();
const router = require('./routes/index');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerFile));



const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Sve sad imam sto sam tia");
});

app.use(router);

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


