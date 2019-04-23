const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection.js');


app.use('/api/v1/auth', mongoConnection, require('./routes/authRoutes.js'));

app.use(express.json());

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));
