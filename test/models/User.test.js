require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');

describe('User model tests', () => {

  it('validates a good model', () => {
    const user = new User ({
      email: 'a@bcd.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'a@bcd.com'
    });      
  });

  it('requires email field', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('has a password virtual and a banana method', () => {
    const user = new User({
      email: 'bonnie@the-runs.com',
      password: 'theruns'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'bonnie@the-runs.com'
    });

    expect(user._tempPassword).toEqual('theruns');
    expect(user.banana('!')).toEqual('banana!');
    expect(User.apple()).toEqual('apple');
  });

  it('has a saved hash password', () => {
    const user = new User({
      email: 'bonnie@the-runs.com',
      password: 'theruns',
      passwordHash: 'xyz'
    });
    expect(user.passwordHash).toEqual('xyz');    
  });

  it('compares a correct password to the saved hash', () => {
    const user = new User({
      email: 'jkhdgsh@lkjdskgj.com',
      password: 'leland',
      passwordHash: '$2b$10$ABCDEFGHIABCDEFGHI123uAVZROaIfLowzKSc4PW0gQLe8SwHwNHK'
    });
    return user.compare('leland')
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('compares an incorrect password to the saved hash', () => {
    const user = new User({
      email: 'jkhdgsh@lkjdskgj.com',
      password: 'leland',
      passwordHash: '$2b$10$ABCDEFGHIABCDEFGHI123uAVZROaIfLowzKSc4PW0gQLe8SwHwNHK'
    });
    return user.compare('banana')
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('creates an auth token', () => {
    const user = new User({
      email: 'jkhdgsh@lkjdskgj.com',
      password: 'leland',
      passwordHash: '$2b$10$ABCDEFGHIABCDEFGHI123uAVZROaIfLowzKSc4PW0gQLe8SwHwNHK'
    });
    const token = user.authToken();
    expect(token).toEqual(expect.any(String));
    const payload = untokenize(token);
    expect(payload).toEqual({
      _id: expect.any(String),
      email: 'jkhdgsh@lkjdskgj.com'
    });
  });

});
