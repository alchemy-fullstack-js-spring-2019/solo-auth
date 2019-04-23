require ('dotenv').config();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { passHash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');

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

  it('password should match password hash', async() => {
    const passwordHash = await passHash('password123');
    const user = new User ({
      email: 'emily@emilybemily.com',
      passwordHash
    });
    const result = await user.compare('password123');
    expect(result).toBeTruthy;
  });

  it('password will not match a bad password', async() => {
    const passwordHash = await passHash('password123');
    const user = new User ({
      email: 'emily@emilybemily.com',
      passwordHash
    });
    const result = await user.compare('badpassword');
    expect(result).toBeFalsy;
  });

  // it('can create an auth token', () => {
  //   const user = new User ({
  //     email: 'emily@emilybemily.com',
  //     passwordHash: 'cool password'
  //   });

  //   const token = user.authToken();
  //   const payload = untokenize(token);

  //   expect()
  // })
});
