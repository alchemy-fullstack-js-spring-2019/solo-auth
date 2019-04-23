const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User model', () => {
  it('creates a new user', () => {
    const user = new User({
      email: 'emily@emilybemily.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'emily@emilybemily.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a virtual password (temp password)', () => {
    const user = new User({
      email: 'emily@emilybemily.com',
      password: 'password123'
    });
    expect(user.toJSON()).toEqual({
      email: 'emily@emilybemily.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
    expect(user._tempPassword).toEqual('password123');
  });
});
