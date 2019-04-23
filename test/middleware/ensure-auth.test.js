require('dotenv').config();
const { createToken } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensure-auth');

describe('ensureAuth middlware', () => {
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
