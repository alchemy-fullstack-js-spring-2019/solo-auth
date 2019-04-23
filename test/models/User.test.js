require('dotenv').config();
const mongoose = require('mongoose'),
  connect = require('../../lib/utils/connect'),
  User = require('../../lib/models/User');

describe('User model tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a user', () => {
    const user = new User({
      email: 'test@email.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@email.com'
    });
  });

  it('it requires an email', () => {
    const user = new User({
      email: ''
    });
    const error = user.validateSync().errors;
    expect(error.email.message).toEqual('Path `email` is required.');
  });

  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'icecreamlov3@hotmail.com',
      password: 'i<3IceCream!'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'icecreamlov3@hotmail.com'
    });
    expect(user._tempPassword).toEqual('i<3IceCream!');
  });

  it('stores passwordHash in save', () => {
    return User
      .create({
        email: '1cecreamlov3@hotmail.com',
        password: 'i<3IceCream!'
      })
      .then(createdUser => {
        expect(createdUser.toJSON()).toEqual({
          email: '1cecreamlov3@hotmail.com',
          _id: expect.any(mongoose.Types.ObjectId)
        });
        // expect(createdUser._tempPassword).toBeFalsy();
      });
  });

  it('compares password with hash and returns true', () => {
    return User
      .create({
        email: 'icecream1ov3@hotmail.com',
        password: 'i<3IceCream!'
      })
      .then(createdUser => {
        createdUser.compare('i<3IceCream!')
          .then(result => {
            expect(result).toEqual(true);
          });
      });
  });

  it('compares password with hash and returns true', () => {
    return User
      .create({
        email: '1cecream1ov3@hotmail.com',
        password: 'i<3IceCream!'
      })
      .then(createdUser => {
        createdUser.compare('iIceCream!')
          .then(result => {
            expect(result).toEqual(false);
          });
      });
  });

  it('creates and returns a token', () => {
    const user = new User({
      email: 'icecreaml0v3@hotmail.com',
      password: 'i<3IceCream!'
    });
    expect(user.authToken()).toEqual(expect.any(String));
  });

  it('returns a promise containing the user from a token', () => {
    const user = new User({
      email: '1cecreaml0v3@hotmail.com',
      password: 'i<3IceCream!'
    });
    const token = user.authToken();
    return User.findByToken(token)
      .then(user => {
        expect(user).toEqual({
          email: '1cecreaml0v3@hotmail.com',
          _id: expect.any(String),
        });
      });
  });
});
