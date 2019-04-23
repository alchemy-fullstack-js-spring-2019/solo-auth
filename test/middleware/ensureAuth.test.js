require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const ensureAuth = require('../../lib/middleware/ensureAuth');

describe('ensureAuth middleware', () => {
  it('validates a good token', done => {
    const token = tokenize({
      email: 'name@email.com'
    });

    const req = {
      token
    };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'name@email.com'
      });
      done();
    };

    ensureAuth(req, res, next);
  });
});
