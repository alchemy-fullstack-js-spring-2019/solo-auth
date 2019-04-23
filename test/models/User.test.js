const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User Model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@test.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'iamapassword'
    });
    expect(user._tempPassword).toEqual('iamapassword');
  });
});
