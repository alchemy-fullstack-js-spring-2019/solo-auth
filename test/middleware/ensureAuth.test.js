require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

describe('ensureAuth middleware', () => {

  it('validates a good token', done => {
    const token = tokenize({
      email: 'a@b.com'
    });
    const req = { token };
    const res = {};

    const next = () => {
      expect(req.user).toEqual({
        email: 'a@b.com'
      });
      done();
    };
    
    ensureAuth(req, res, next);
  });

});
