require('dotenv').config();
const { createToken } = require('../../lib/utils/token');
const { ensureAuth, bearerToken } = require('../../lib/middleware/ensure-auth');

describe('ensureAuth middleware', () => {
  it('grabs the token from req', done => {
    const token = 'Bearer tokenstring';
    const req = {
      get: () => token
    };
    const res = {};
    const next = () => {
      expect(req.token = 'tokenstring');
      done();
    };

    bearerToken(req, res, next);
  });

  it('validates a good token', done => {
    const token = createToken({
      email: 'test@test.com'
    });

    const req = {
      token
    };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'test@test.com'
      });
      done();
    };

    ensureAuth(req, res, next);
  });
});
