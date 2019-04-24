require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');


describe('ensure auth middleware', () => {
  it('ensure good token', done => {
    const token = tokenize({ email: 'sonso@gmail.com' });

    const req = { token };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'sonso@gmail.com'
      });
      done();
    };

    ensureAuth(req, res, next);
  });
});
