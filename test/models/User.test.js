const mongoose = require('mongoose');

const User = require('../../lib/models/User');

describe('User model', () => {
  it('has an email address', () => {
    const user = new User({
      email: 'email@email.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      emai: 'email@email.com'
    });
  });
  it('has a temp password', ()=> {
    const user = new User({
      email: 'email@email.com',
      password: 'password456'
    });
    expect(user._tempPassword).toEqual('password456');
  });
});

