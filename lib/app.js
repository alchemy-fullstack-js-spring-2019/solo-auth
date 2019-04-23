const express = require('express');
const app = express();
const authRoutes = require('../lib/routes/auth');

app.use(express.json());

app.use('/auth', authRoutes);
app.use(require('./middleware/not-found'));

module.exports = app;
