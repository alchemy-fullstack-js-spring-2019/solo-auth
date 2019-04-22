require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const jwt = require('jsonwebtoken');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      email: 'test@test.com'
    });

    expect(token).toEqual(expect.any(String));
  });
});
