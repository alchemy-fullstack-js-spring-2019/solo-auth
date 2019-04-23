require('dotenv').config();
const { tokenizer } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

describe('ensureAuth middleware', () => {

  it('validates a good token', done => {
    const token = tokenizer({ email: 'lies@liars.com' });

    const req = {
      token
    };

    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'lies@liars.com'
      });
      done();
    };

    ensureAuth(req, res, next);
  });
});
