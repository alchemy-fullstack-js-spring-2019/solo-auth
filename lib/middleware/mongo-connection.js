const mongoose = require('mongoose');
const state = require('mongoose/lib/connection/state');

module.exports = (req, res, next) => {
  const readyState = mongoose.connections.readyState;
  if(readyState === state.connected || readyState === state.connecting) {
    next();
  } else {
    const error = new Error('Unable to connect to DB.');
    error.status = 500;
    next(error);
  };
};
