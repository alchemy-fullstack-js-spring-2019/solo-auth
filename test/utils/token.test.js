const jwt = require('jsonwebtoken');

describe('json web token tests', () => {

  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

});
