const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const hash = require('../../lib/utils/hash');
const compare = require('../../lib/utils/compare');
const { tokenize, untokenize } = require('../../lib/utils/token');
require('dotenv').config();

describe('User model', () => {
    beforeAll(() => {

    });

    it('validates a good model', () => {
        const user = new User({ email: 'test@test.com' });
        expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });
    });

    it('has a temp password', () => {
        const user = new User({ email: 'test@test.com', password: 'pw123' });
        expect(user._tempPassword).toEqual('pw123');
    });
    
    it('hashes the password', () => {
        const user = new User({ email: 'test@test.com', password: 'pw123' });
        user.save()
            .then(() => {
                return hash('pw123')
                    .then(hashed => {
                        return compare(user.passwordHash, hashed)
                            .then(res => {
                                expect(res).toBeTruthy();
                            });
                    });
            });
    
        
    });

    // it('tests methods and statics', () => {
    //     const user = new User({ email: 'test@test.com', password: 'pw123' });

    //     expect(user.banana('n')).toEqual('bananan');
    //     expect(User.apple()).toEqual('apple');
    // });

    it('compares', () => {
        const user = new User({ email: 'test@test.com', password: 'pw123' });
        user.compare('pw123')
            .then(res => {
                expect(res).toBeTruthy;
            });
    });

    // it('ryans compare', async() => {
    //     const passwordHash = await hash('password1234');
    //     const user = new User({
    //         email: 'test@test.com',
    //         passwordHash
    //     }); 

    //     const result = await user.compare('password1234');
    //     expect(result).toBeTruthy;
    // });

    it('authToken', () => {
        const user = new User({ email: 'test@test.com', password: 'pw123' });
        const returnedToken = user.authToken();
        const untokenized = untokenize(returnedToken);

        expect(untokenized).toEqual({ email: 'test@test.com', _id: user._id.toString() });
    });
});

