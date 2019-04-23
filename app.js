const express = require('express');
const app = express();
const authRoute = require('./lib/routes/auth');

app.use(express.json())

app.use('/auth', authRoute);
