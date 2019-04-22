const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('validates a good model', () => { 
    const user = new User({
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId), 
      email: 'test@test.com' 
    });
  });
});
