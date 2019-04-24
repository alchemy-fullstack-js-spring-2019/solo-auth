const mongoose = require('mongoose');
const { hash } = require ('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('has a password virtual', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password'
    });

    expect(user.toJSON()).toEqual({
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });

    expect(user._tempPassword).toEqual('password');
  });

  it('can compare a good password', () => {
    return hash('password1234')
      .then(passwordHash => {
        const user = new User({
          email: 'test@test.com',
          passwordHash
        });

        return user.compare('password1234');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare a bad password', () => {
    return hash('password1234')
      .then(passwordHash => {
        const user = new User({
          email: 'test@test.com',
          passwordHash
        });

        return user.compare('password');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can create an auth token', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'randomHash'
    });

    const token = user.authToken();
    const payload = untokenize(token);
    expect(payload).toEqual({
      email: 'test@test.com',
      _id: user._id.toString()
    });
  });
});
