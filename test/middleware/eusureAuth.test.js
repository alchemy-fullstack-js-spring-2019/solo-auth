require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const ensureAuth = require('../../lib/middleware/ensureAuth');

describe('ensure auth middleware', () => {
  it('validates a valid token!', done => {
    const token = tokenize({ email: 'email@myemail.com' });
    const req = { token };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({ email: 'email@myemail.com' });
      done();
    };
    ensureAuth(req, res, next);
  });
});
