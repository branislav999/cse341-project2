const express = require('express');
const app = express();
const router = require('./routes/users');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const cors = require('cors');


app.use(cors());  
app.use(express.json());


app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerFile));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Sve sad imam sto sam tia");
});

app.use(router);
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, the page cannot be found'});
});

app.use((err, req, res, send) => {
    if (err.status === 404) {
        res.status(404).send(err.message);
    } else {
        next(err);
    }
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


