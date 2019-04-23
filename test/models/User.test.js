require('dotenv');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');

// create a test it('validates a good model', () => { }
// create a new user with const user = new User({ email: 'test@test.com' });
// expect(user.toJSON()).toEqual({ email: 'test@test.com' })

describe('User model tests', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com', });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });//expect.anything() });
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'blah@blah.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  // it.skip(..) skips a test
  it('can compare a tokenized password', async() => { //async
    const passwordHash = await hash('password111');
    const user = new User({
      email:'test@mail.com',
      passwordHash
    });
    const result = await user.compare('password111');
    expect(result).toBeTruthy();
  });

  // it('can create an authToken', () => {
  //   return User.create({
  //     email: 'jkfjf@stuff.com',
  //     password: 'password'
  //   })
  //     .then(user => {
  //       const token = user.authToken();
  //       const payload = untokenize(token); //portin
  //       expect(payload).toEqual({
  //         _id: user._id.toString(),
  //         email: 'jkfjf@stuff.com'//,
  //       //token
  //       });
  //     });
  // });
});

// it('can create an authToken', async() => {
//   const userAuthTokened = await user.authToken('passwordingOverHere');
//   const user = new User({
//     email: 'jkfjf@stuff.com',
//     await userAuthTokened
//   });
    
//   const payload = await untokenize(userAuthTokened);
//   expect(payload).toEqual({
//     _id: user._id.toString(),
//     email: 'jkfjf@stuff.com'
//   });
// });
