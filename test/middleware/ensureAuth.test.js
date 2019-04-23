const ensureAuth = require('../../lib/middleware/ensureAuth');
const { tokenize } = require('../../lib/utils/token');

describe('ensureAuth middleware tests', () => {
  it('can verify a token', done => {
    const token = tokenize({
      email: 'tester@marty.net'
    });
    const req = {
      token
    };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'tester@marty.net'
      });
      done();
    };

    ensureAuth(req, res, next);
  });
});
