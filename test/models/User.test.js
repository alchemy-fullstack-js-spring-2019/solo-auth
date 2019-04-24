require('dotenv').config();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');


describe('User model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'megan@megan.com'
    });

    expect(user.toJSON()).toEqual({
      email: 'megan@megan.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required email', () => {
    const user = new User({

    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'megan@megan.com',
      password: 'secret'
    });

    expect(user.toJSON()).toEqual({
      email: 'megan@megan.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
    expect(user._tempPassword).toEqual('secret');
  });

  it('returns true if plain text pw matches hashed pw', async() => {
    const passwordHash = await hash('test123');
    const user = new User({
      email: 'megan@megan.com',
      passwordHash: passwordHash
    });
    const result = await user.compare('test123');
    expect(result).toBeTruthy();
  });
  
  it('returns false if plain text pw does not match hashed pw', async() => {
    const password = 'alys246';
    const hashedPassword = await hash(password);
    const user = new User({
      email: 'megan@megan.com',
      passwordHash: hashedPassword
    });
    const result = await user.compare('megan123');
    
    expect(result).toBeFalsy();
  });

  it('can create an auth token', () => {
    const user = new User({
      email: 'megan@megan.com',
      password: 'whatever'
    });
    const token = user.authToken();
    const payload = untokenize(token);
    expect(payload).toEqual({
      _id: expect.any(String),
      email: 'megan@megan.com'
    });
  });
});



