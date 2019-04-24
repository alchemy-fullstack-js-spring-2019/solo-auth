const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const hash = require('../../lib/utils/hash');
const { verifyToken } = require('../../lib/utils/token');

describe('User model', () => {
  it('validates a good model', () => { 
    const user = new User({
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId), 
      email: 'test@test.com' 
    });
  });

  it('has a required email', () => {
    const user = new User({});

    const errors = user.validateSync().errors;
    expect(errors.email.message).toBe('Path `email` is required.');
  });

  it('stores a temp password', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password123'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId), 
      email: 'test@test.com' 
    });

    expect(user._tempPassword).toEqual('password123');
  });

  it('can compare a good password', async() => {
    const passwordHash = await hash('password123');
    const user = new User({
      email: 'test@test.com',
      passwordHash
    });

    const result = await user.comparePw('password123');
    expect(result).toBeTruthy();
  });

  it('can compare a hashed password', () => {
    const password = 'pword123';
    return hash(password)
      .then(passwordHash => {
        const user = new User({
          email: 'test@test.com',
          passwordHash
        });
        return user.comparePw(password);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can create an authToken', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'somerandomstring'
    });

    const token = user.createAuthToken();
    expect(verifyToken(token)).toEqual({
      _id: expect.any(String),
      email: 'test@test.com'
    });
  });
});
