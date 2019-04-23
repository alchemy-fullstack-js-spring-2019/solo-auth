
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(authHeader) {
    const token = authHeader.replace(/Bearer\s/i, '');
    req.token = token;
    next(); 
  } else {
    const error = new Error('Invalid token');
    next(error);
  }
};

