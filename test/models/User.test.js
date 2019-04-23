const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('user model', () => {
  it('has an email', () => {
    const user = new User({ 
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });
  });

  it('has a password virtual', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password'
    });

    expect(user.toJSON).toEqual({
      _id: expect.(mongoose.Types.ObjectId),
      email: 'test@test.com'
    });
    expect(user._tempPassword).toEqual('password');
  });
});
