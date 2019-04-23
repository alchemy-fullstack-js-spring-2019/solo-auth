const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const hash = require('../../lib/utils/hash');
const compare = require('../../lib/utils/compare');

describe('User model', () => {
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
});
