require('dotenv').config();
require('../../lib/utils/connect.js')();
const { tokenize } = require('../../lib/utils/jwt.js');
const { ensureAuth } = require('../../lib/middleware/ensureAuth.js');


describe('ensureAuth middlware', () => {
  it('validates a good token', done => {
    const token = tokenize({
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

