const mongoose = require('mongoose');

const User = require('../../lib/models/User');

describe('User model', () => {
  it('has an email address', () =>{
    const id = new mongoose.Types.ObjectId;
    const user = new User({
      user: id,
      email: 'email@email.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'email@email.com'
    });
  })
});

