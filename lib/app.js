const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');

app.use(require('morgon')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
