const findAuthToken = require('../../lib/middleware/find-auth-token');

describe('find token middleware', () => {
  it('removes Bearer from token in header', done => {
    const req = { get: () => 'Bearer aldjfldjfalsdfalsdla' };
    const res = {};
    const next = () => {
      expect(req.token).toEqual('aldjfldjfalsdfalsdla');
      done();
    };
    findAuthToken(req, res, next);
  });
});
