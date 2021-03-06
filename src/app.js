const express = require('express');

const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/covid19-api/v1',routes);

module.exports = app;

