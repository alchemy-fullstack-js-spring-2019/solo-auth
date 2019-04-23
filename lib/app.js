const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

app.use(express.json());

app.use('/auth', authRoute);

module.exports = app;
