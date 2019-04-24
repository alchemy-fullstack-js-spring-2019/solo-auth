const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('models', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@testy.com'
    });
    expect(user.toJSON()).toEqual({ email: 'test@testy.com', _id: expect.any(mongoose.Types.ObjectId) });
  });

  it('must have a unique email', () => {
    const user = new User({
    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toBe('Path `email` is required.');
  });

  it('stores a temp/virtual password', () => {
    const user = new User({
      email: 'email@email.com',
      password: 'password'
    });
    expect(user._tempPassword).toEqual('password');
  });

  it('compares clear txt pw with pw hash', () => {
    const pw = 'password';
    User.create({
      email: 'email@email.com',
      password: pw,
      passwordHash: '23456'
    })
      .then(createdUser => {
        expect(createdUser.compare(pw)).toBe(false);
      });
  });

  it('returns a token for a user', () => {
    User.create({
      email: 'email@mail.com',
      password: 'pwpwpw'
    })
      .then(createdUser => {
        expect(createdUser.authtoken()).toEqual(expect.any(String));
      });
  });

  it('can find a user by token', () => {
    User.create({ email: 'cara@rrr.net', password: 'pwpw123' })
      .then(createdUser => createdUser.tokenize())
      .then(token => User.findByToken(token))
      .then(foundUser => expect(foundUser).toEqual({ email: 'cara@rrr.net', password: 'pwpw123' }));
  });


});
