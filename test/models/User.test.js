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
});
