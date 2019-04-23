const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User model test', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ 
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@test.com'
    });
  });

  it('has a password virtual', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password123'
    });
    expect(user._tempPassword).toEqual('password123');
  });

  // it('sets a password hash', () => {
  //   const user = new User({
  //     email: 'test@test.com',
  //     password: 'password123'
  //   });
  //   console.log(user.passwordHash);
  //   expect(user.toJSON()).toEqual({
  //     email: 'test@test.com',
  //     _id: expect.any(mongoose.Types.ObjectId),
  //     passwordHash: expect.any(String)
  //   });
  // });

  it('says banana', () => {
    const user = new User({
      email: 'abc@123.com'
    });

    expect(user.banana).toEqual('banana');
  });
});
