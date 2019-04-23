const User = require('../../lib/models/User.js');
const mongoose = require('mongoose')
const { hashFn } = require('../../lib/utils/hash.js');

describe('user', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'intro_mode@email.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'intro_mode@email.com',
      _id: expect.any(mongoose.Types.ObjectId) //because we JSONed
    })
  });
  it('has a password virtual', () => {
    const user = new User({
      email: 'intro_mode@email.com',
      clearPassword: 'youllneverguess'
    });
    //why are we toJSONing here?
    expect(user.toJSON()).toEqual({
      email: 'intro_mode@email.com',
      _id: expect.any(mongoose.Types.ObjectId) //because we JSONed
      //no password because we want the password to be hashed and hidden from the database? 
    });
    //we temporarily store the clear password here by adding a virtual to your User Schema 
    expect(user._tempPassword).toEqual('youllneverguess')
  });
  it.only('uses the compare method to check if the hash password and clear password match', async () => {
    const hashedPwd = await hashFn('muahahah')
    // faked hashed here because we arent saving to db? so it doesnt get hashed?
    //if we were to use .create then it would store in the db and would hash
    const user = new User({
      email: 'intro_mode@email.com',
      passwordHash: hashedPwd
    });
    //compare is a promise so must use await//waiting for async communication 
    const results = await user.compare('muahahah')
    expect(results).toBeTruthy();
  });
  it('uses the authToken method to take a user\'s payload and returns its made token', () => {
    const user = new User({
      email: 'intro_mode@email.com',
    });
    console.log(user.authToken());
    expect(user.authToken()).toEqual(expect.any(String));
  });
});
