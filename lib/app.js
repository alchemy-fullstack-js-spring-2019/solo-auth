const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection.js');
const { bearerToken } = require('./middleware/ensureAuth.js');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

//why do we have to run bearerToken here?
app.use(bearerToken);

app.use('/api/v1/auth', mongoConnection, require('./routes/authRoutes.js'));

module.exports = app;

