require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

describe('ensureAuth middleware', () => {
  it('validates a correct token', done => {
    const token = tokenize({
      email: 'emily@test.com'
    });

    const req = { token };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'emily@test.com'
      });
      done();
    };
    ensureAuth(req, res, next);
  });
});
