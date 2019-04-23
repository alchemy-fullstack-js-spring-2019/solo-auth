
require('dotenv');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const hash = require('../utils/hash');

// create a test it('validates a good model', () => { }
// create a new user with const user = new User({ email: 'test@test.com' });
// expect(user.toJSON()).toEqual({ email: 'test@test.com' })

describe('User model tests', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com', });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });//expect.anything() });
  });
  // it('has a required email', () => {
  //   const user = new User({});
  //   //expect(user.email);
  //   const errors = user.validateSync().errors;
  //   expect(errors.user.message).toEqual('Path `user` is required.');
  //   console.log(errors);
  // });
  it('stores a _tempPassword', () => {
    const user = new User({ email: 'blah@blah.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  // it('add username', () => {
  //   conse user = new User({

  //   })
  // })

  it('can compare', async() => {
    const passwordHash = await hash('password1234');
    const user = new User({
      email: 'test@kko',
      passwordHash
    });
    const result = await(user.compare('password1234'));
    expect(result).toBeTruthy;
  });

  // it.skip(..) skips a test
  it('tokenize function', () => {
    const user = new User({
      email:'test@mail.com',
      password: 'password'
    });
    expect(user.authToken).toEqual('password');
  });

  it('can create an authToken', () => {
    return User.create({
      email: 'jkfjf',
      password: 'password'
    })
      .then(user => {
        const token = user.authToken();
        const payload = untokenize(token); //portin
        expect(payload).toEqual({
          _id: user._id.toString(),
          email: 'jkfjf'
        });
      });
  });

});
