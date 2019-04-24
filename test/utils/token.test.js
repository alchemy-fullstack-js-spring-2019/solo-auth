const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/tokenize');
const obj = { payload: {
  _id: '1234',
  email: 'test@test.com'
}
};
const tokened = jwt.sign({
  payload: {
    hi: 'there'
  }
}, 'secret');

describe('jwt', () => {
  it('can create a token', () => {
    const token = jwt.sign({
      payload: {
        _id: '1234',
        email: 'test@test.com'
      }
    }, 'secret', { expiresIn: '1h' });

    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({
      payload: {
        hi: 'there'
      }
    }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

  it('can verify a token with expiration', () => {
    const token = jwt.sign({
      payload: {
        dog:'spot'
      }
    }, 'secret', { expiresIn: '1hr' });
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ payload: { dog: 'spot' }, iat: expect.any(Number), exp: expect.any(Number) }
    );
  });
});

describe('jwt functions', () => {
  it('can create a token', () => {
    const token = tokenize(obj);
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const untokened = untokenize(tokened);
    expect(untokened).toEqual({ hi: 'there' });
  });
});
