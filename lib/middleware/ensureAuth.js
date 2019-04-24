const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const headerValue = req.get('Authorization') || '';
  const token = headerValue.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};
 

