const express = require('express');
const app = express();

const Router = express.Router();
require('dotenv').config();

const port = process.env.PORT || 3000;

const urlsRouter = require('./src/api/urls');

app.use('/url', urlsRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
}); 