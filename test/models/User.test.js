const User = require('../../lib/models/User');

describe('User model test', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'marty@powertest.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'marty@powertest.com'
    });
  });
});
