require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/auth', {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has an email', () => {
    const user = new User({
      email: 'name@email.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'name@email.com'
    });
  });
  it('has a _tempPassword', () => {
    const user = new User({
      email: 'email@email.com',
      pw: 'password123'
    });

    expect(user._tempPassword).toEqual('password123');
  });
  it('adds a username', () => {
    const user = new User({
      email: 'name@email.com',
      pwHash: '1234'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'name@email.com'

    });
  });
  it('can compare a good password', () => {
    return User.create({
      email: 'name@email.com',
      pw: 'password1234'
    })
      .then(user => {
        return user.compare('password1234');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });
  it('can compare bad passwords', () => {
    return User.create({
      email: 'name@email.com', 
      pw: 'password1234'
    })
      .then(user => {
        return user.compare('badPassword');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });
});
