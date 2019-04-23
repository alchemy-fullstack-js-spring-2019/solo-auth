const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('validates a good model', () => {
    const user = new User({
      name: 'emily',
      email: 'testing@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email:'testing@test.com'
    });
  });

  it('has a _tempPassword', () => {
    const user = new User({
      email: 'testing@test.com',
      password: 'password0001'
    });

    expect(user._tempPassword).toEqual('password0001');
  });

  it('adds a username', () => {
    const user = new User({
      email: 'testing@test.com',
      passwordHash: '1234'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'testing@test.com'
    });
  });
});
