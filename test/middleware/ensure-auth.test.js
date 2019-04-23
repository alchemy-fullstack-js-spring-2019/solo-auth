require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { findAuthToken, ensureAuth } = require('../../lib/middleware/ensureAuth');

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

  it('validates a token from a user request', done => {
    const token = tokenize({
      email: 'test@email.com'
    });
    const req = { token }; 
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'test@email.com'
      });
      done();
    };
    ensureAuth(req, res, next);
  });
});
