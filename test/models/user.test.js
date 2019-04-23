const User = require('../../lib/Model/User');
const mongoose = require('mongoose');

describe('Model', () => {
    it('validates email is required', () => {
        const user = new User({ });
        console.log('user', user);
        const errors = user.validateSync().errors;
        expect(errors.email.message).toEqual('Path `email` is required.');
    
    });
    it('valideates email can be sent', () => {
        const user = new User({ email:'test@test.com' });
     
       
        expect(user.toJSON()).toEqual({
            email:'test@test.com',
            _id: expect.any(mongoose.Types.ObjectId)
        });
  
    });
});
