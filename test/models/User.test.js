require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');

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

  it('has a _tempPassword', () => {
    const user = new User({
      email: 'testing@test.com',
      password: 'password0001'
    });

    expect(user._tempPassword).toEqual('password0001');
  });

  it('adds a username', () => {
    const user = new User({
      email: 'testing@test.com',
      passwordHash: '1234'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'testing@test.com'
    });
  });

  it('can compare a good password', async() => {
    return User.create({
      email: 'testing@test.com',
      password: 'password0001'
    })
      .then(user => {
        return user.compare('password0001');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
    });
});
