const User = require('../../lib/models/User.js');
const mongoose = require('mongoose')

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

});
