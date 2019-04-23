const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const { findAuthToken } = require('./middleware/ensureAuth');

app.use(express.json());
app.use(findAuthToken);

app.use('/auth', authRoute);

app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));
module.exports = app;
