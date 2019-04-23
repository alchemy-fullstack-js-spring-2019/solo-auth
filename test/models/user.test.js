require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/Model/User');
const { untokenize } = require ('../../lib/utils/token');



describe('User model', () => {
    beforeAll(() => {
        console.log('connecting ot mongoose');
        return mongoose.connect('mongodb://localhost:27017/auth', {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });
    });
    
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    
    afterAll(() => {
        return mongoose.connection.close();
    });

    // it('has an email', () => {
    //     const user = new User({
    //         email: 'test@test.com'
    //     });

    //     expect(user.toJSON()).toEqual({
    //         _id: expect.any(mongoose.Types.ObjectId),
    //         email: 'test@test.com'
    //     });
    // });

  
    it('has an email', () => {
        const user = new User({
            email: 'test@test.com'
        });
    
        expect(user.toJSON()).toEqual({
            _id: expect.any(mongoose.Types.ObjectId),
            email: 'test@test.com'
        });
    });
    
    it('has a _tempPassword', () => {
        const user = new User({
            email: 'test@test.com',
            password: 'password123'
        });
    
        expect(user._tempPassword).toEqual('password123');
    });
    
    it('adds a username', () => {
        const user = new User({
            email: 'test@test.com',
            passwordHash: '1234'
        });
    
        expect(user.toJSON()).toEqual({
            _id: expect.any(mongoose.Types.ObjectId),
            email: 'test@test.com'
        });
    });
    
    it('can compare a good password', () => {
        return User.create({
            email: 'test@test.com',
            password: 'password1234'
        })
            .then(user => {
                return user.compare('password1234');
            })
            .then(result => {
                expect(result).toBeTruthy();
            });
    });
    
    it('can compare a bad password', () => {
        return User.create({
            email: 'test@test.com',
            password: 'password1234'
        })
            .then(user => {
                return user.compare('badPassword');
            })
            .then(result => {
                expect(result).toBeFalsy();
            });
    });
    
    it('can create a authToken', () => {
        return User.create({
            email: 'test@test.com',
            password: 'password'
        })
            .then(user => {
                const token = user.authToken();
                console.log('token', token);
                const payload = untokenize(token);
                console.log('payload', payload);
                expect(payload).toEqual({
                    _id: user._id.toString(),
                    email: 'test@test.com'
                });
            });
    });
    
    it('can create a authToken withDB', () => {
        const user = new User({
            email: 'test@test.com',
            passwordHash: 'randomHash'
        });
    
        const token = user.authToken();
        const payload = untokenize(token);
        expect(payload).toEqual({
            _id: user._id.toString(),
            email: 'test@test.com'
        });
    });
});
