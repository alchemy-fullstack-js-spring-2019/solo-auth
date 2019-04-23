require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');


describe('User model test', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/auth', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a user model', () => {
    const user = new User({
      email: 'test@testemail.com'
    });
    expect(user.toJSON()).toEqual({ 
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@testemail.com'
    });

  });
  it('has a required email address', () => {
    const user = new User({
    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('stores a temporary password', () => {
    const user = new User({
      email: 'test@testemail.com',
      password: 'password123'
    });
    expect(user._tempPassword).toEqual('password123');
  });

  it('compares a password and a hashed password', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password123'
    })
      .then(user => {
        return user.compare('password123');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('compares a bad password', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password123'
    })
      .then(user => {
        return user.compare('password124');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
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
          _id: user._id.toString(),
          email: 'test@test.com'
        });
      });
  });

});
