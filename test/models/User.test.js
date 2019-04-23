const User = require('../../lib/models/User');
const mongoose = require('mongoose');


describe('User model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'megan@megan.com'
    });

    expect(user.toJSON()).toEqual({
      email: 'megan@megan.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
