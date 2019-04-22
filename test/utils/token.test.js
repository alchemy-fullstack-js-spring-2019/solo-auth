const jwt = require('jsonwebtoken');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = jwt.sign({
      payload: {
        _id: '1234',
        email: 'leslie@gmail.com'
      }
    }, 'secret', { expiresIn: '1h' });

    expect(token).toEqual(expect.any(String));
  });
});
