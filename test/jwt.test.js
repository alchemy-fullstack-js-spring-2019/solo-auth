const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenize = require('../lib/utils/jwt.js');

describe('jwt', () => {
  it('uses a tokenize function to take user data and a secret and generate a jwt', () => {
    const token = tokenize({
       id: '543fds',
      email: 'intro_mode@email.com'
    });
    expect(token).toEqual(expect.any(String));
  });
});
