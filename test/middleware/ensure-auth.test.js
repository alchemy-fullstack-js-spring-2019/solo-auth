const { findAuthToken } = require('../../lib/middleware/ensureAuth');

describe('auth middleware', () => {

  it('finds a token from authorization header', done => {
    const req = {
      get: () => 'Bearer abc1234'
    };
    const res = {};
    const next = () => {
      expect(req.token).toEqual('abc1234');
      done();
    }; 
    findAuthToken(req, res, next);
  });
});
