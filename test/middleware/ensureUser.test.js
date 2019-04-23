const { setAuthToken, ensureAuth } = require('../../lib/middleware/ensureUser'),
  User = require('../../lib/models/User'),
  { tokenize } = require('../../lib/utils/token');

describe('setAuthToken', () => {
  it('returns an auth token', () => {
    const req = { get: () => 'Bearer blblblblblb' },
      res = {},
      next = () => {
        expect(req.token).toEqual('blblblblblb');
      };

    setAuthToken(req, res, next);
  });
});

describe('ensureAuth', () => {
  it('adds a user to req based on token', () => {
    const user = new User({
      email: 'tommy@tran.com',
      password: '1Password'
    });
    const token = tokenize(user.toJSON());

    const req = { get: () => `Bearer ${token}` };
    const res = {};
    const next1 = () => expect(req.token).toEqual(token);
    const next2 = () => expect(req.user).toEqual({
      _id: expect.any(String),
      email: 'tommy@tran.com'
    });

    setAuthToken(req, res, next1);
    return ensureAuth(req, res, next2);
  });
});
