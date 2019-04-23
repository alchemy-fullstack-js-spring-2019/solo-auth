const findAuthToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  //strip off Bearer (space) and attach to req.token
    
  next();
};

module.exports = {
  findAuthToken
};
