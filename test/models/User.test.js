const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  it('has an email', () => {
    const user = new User({
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@test.com'
    });
  });

  it('has a _tempPassword', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password123'
    });

    expect(user._tempPassword).toEqual('password123');
  });

  it('adds a username', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: '1234'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@test.com'
    });

    expect(user.banana()).toEqual('banana');
    expect(User.apple()).toEqual('apple');
  });

  it('can compare a good password', async() => {
    const passwordHash = await hash('password1234');
    const user = new User({
      email: 'test@test.com',
      passwordHash
    });

    const result = await user.compare('password1234');
    expect(result).toBeTruthy();
  });

  it('can compare a bad password', async() => {
    const passwordHash = await hash('password1234');
    const user = new User({
      email: 'test@test.com',
      passwordHash
    });

    const result = await user.compare('badPassword');
    expect(result).toBeFalsy();
  });

  it('can create an authToken', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(user => {
        const token = user.authToken();
        const payload = untokenize(token);
        expect(payload).toEqual({
          _id: user._id,
          email: 'test@test.com'
        });
      });
  });
});
