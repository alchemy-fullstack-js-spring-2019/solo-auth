const User = require('../../lib/models/User.js');
const mongoose = require('mongoose');

it('validates a good model', () => {
  const user = new User({ email: 'test@test.com' });
  expect(user.toJSON()).toEqual({
    email: 'test@test.com',
    _id: expect.any(mongoose.Types.ObjectId) });
});

it('has a required email', () => {
  const user = new User({});
  const errors = user.validateSync().errors;

  expect(errors.email.message).toEqual('Path `email` is required.');
});

it('uses virtual to set a password', () => {
  const user = new User({ email: 'test@test.com', password: 'dude' });
  expect(user._tempPassword).toEqual('dude');
});

// it('uses the temp pass to set a real pass', () => {
//   return User.create({ email: 'test@test.com', password:'passed' })
//     .then(createdUser => {
//       console.log(createdUser);

//       return User.findById(createdUser._id);
//     });
// });
