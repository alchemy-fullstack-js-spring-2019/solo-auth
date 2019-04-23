const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const mongoConnection = require('./middleware/mongo-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));
app.use(express.json());
app.use('/api/v1/auth', mongoConnection, authRoute);
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
