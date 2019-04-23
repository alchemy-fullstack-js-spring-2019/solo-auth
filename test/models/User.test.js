const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('has an email', () => {
    const user = new User({
      email: 'name@email.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'name@email.com'
    });
  });
  it('has a _tempPassword', () => {
    const user = new User({
      email: 'email@email.com',
      pw: 'password123'
    });

    expect(user._tempPassword).toEqual('password123');
  });
  it('adds a username', () => {
    const user = new User({
      email: 'name@email.com',
      pwHash: '1234'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'name@email.com'

    });
  });
});
