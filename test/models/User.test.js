require('dotenv').config();
const mongoose = require('mongoose');
const { untokenize } = require('../../lib/utils/token');
const User = require('../../lib/models/User');

describe('User tests', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/auth',
      { 
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

  it('validates good model', () => {
    const user = new User({ email: 'email@aol.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'email@aol.com',
      _id: expect.anything()
    });
  });

  it('has email required', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('has a temp pw', () => {
    const user = new User({
      email: 'email@aol.com',
      password: 'flanderssucks'
    });

    expect(user._tempPassword).toEqual('flanderssucks');
  });

  it('add a user', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'password'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@test.com'
    });
  });

  it('compares a good pw', () => {
    return User.create({
      email: 'testy@test.com',
      password: 'password123'
    })
      .then(user =>{
        return user.compare('password123');  
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('compares a bad pw', () => {
    return User.create({
      email: 'testy@test.com',
      password: 'password123'
    })
      .then(user =>{
        return user.compare('smurf');  
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('creates an authToken', () => {
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

  it('creates a authToken withDB', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'hashedPassword'
    });
    
    const token = user.authToken();
    const payload = untokenize(token);
    expect(payload).toEqual({
      _id: user._id.toString(),
      email: 'test@test.com'
    });
  });
});
