require('dotenv').config();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');

describe('User Test', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/solo-auth', {
      useNewUrlParser:true,
      useFindAndModify:false,
      useCreateIndex:true
    });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId) 
    });
  });

  it('has required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ 
      email: 'test@test.com',
      password1: '1234'
    });
    expect(user._tempPassword).toEqual('1234');
  });

  it('password hash is set after save', () => {
    const user = new User({ 
      email: 'test@test.com',
      passwordHash: '1234'
    });
    expect(user.passwordHash).toEqual('1234');
  });

  it('compare passwords', () => {
    return User.create({
      email: 'test@gmail.com',
      password1: 'password'
    })
      .then(user => {
        console.log('****', user);
        return user.compare('password');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('async compare', async() => {
    const passwordHash = await hash('password1234');
    const user = new User({
      email: 'test@gmail.com',
      passwordHash
    });
    const  result = await user.compare('password1234');
    expect(result).toBeTruthy();
  });

  it('can create a authToken', () => {
    return User.create({
      email: 'test@test.com',
      password1: 'password'
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

  it('can create a authToken withDB', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'randomHash'
    });

    const token = user.authToken();
    const payload = untokenize(token);
    expect(payload).toEqual({
      _id: user._id.toString(),
      email: 'test@test.com'
    });
  });


});
