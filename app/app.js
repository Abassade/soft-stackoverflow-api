
require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./lib/requestErrorHandler');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// mongo connection
require('./lib/mongo');
// routes configuration
require('./routes')(app);

app.get('/', async (req, res) => {
  res.status(200).send('welcome to stackoverflow-api');
});

// error handling must be the last middleware
app.use(errorHandler);

module.exports = app;
