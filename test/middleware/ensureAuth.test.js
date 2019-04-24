require('dotenv').config();
const { ensureAuth, findAuthToken } = require('../../lib/middleware/ensureAuth');
const { tokenize } = require('../../lib/utils/tokenize');

describe('ensureAuth middleware', () => {
  it('obtains token', () => {
    const token = tokenize({
      email: 'test'
    });
  
    const req = { get: () => token };
    const res = {};
    const next = () => {
      expect(req.token).toEqual(token);
    };

    findAuthToken(req, res, next);
  });

  it('validates a good token', () => {
    const token = tokenize({
      email: 'good@test.com'
    });

    const req = {
      token
    };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        email: 'good@test.com' }
      );
    };

    ensureAuth(req, res, next);
  });
});
