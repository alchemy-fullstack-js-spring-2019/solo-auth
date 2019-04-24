require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { tokenizer, untokenizer } = require('../../lib/utils/token');
const { hash } = require('../../lib/utils/hash');

describe('user auth', () => {

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

  it('has creates a user', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });
  });

  it('has creates a user', () => {
    const user = new User({ });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@lies.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  it('hashes password after save', () => {
    const user = new User({ email: 'test@lies.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  it('uses compare instance method', async() => {
    return hash('password123')
      .then(passwordHash => {
        const user = new User({
          email: 'teststuff',
          passwordHash
        });
        return user.compare('password123');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can create an auth token', () => {
    return User.create({ email: 'blah', password: 'password' })
      .then(user => {
        const token = user.authToken();
        const payload = untokenizer(token);
        expect(payload).toEqual({
          _id: user._id.toString(),
          email: 'blah'
        });
      });
  });

  it('finds a token', () => {
    return User.create({ email: 'more@lies.com', password: 'password' })
      .then(payload => { 
        return tokenizer(payload);
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(foundUser => {
        console.log('founduser', foundUser);
        expect(foundUser).toEqual({ email: 'more@lies.com', _id: expect.any(String) });
      });
  });
});
