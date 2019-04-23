const mongoose = require('mongoose');
const User = require('../../lib/Model/User');


describe('User model', () => {
    beforeAll(() => {
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

    it('has a _tempPassword', () => {
        const user = new User({
            email: 'test@test.com',
            password: 'password123'
        });
        console.log('temp in only', user._tempPassword);
        expect(user._tempPassword).toEqual('password123');

    });
    // it('adds a username', ()=>{
    //     const user = new User({
    //         email: 'email@gmail.com',
    //         passwordHash: '1234'
    //     });
    //     expect(user.toJSON()).toEqual({
    //         _id: expect.any(mongoose.Types.ObjectId),
    //         email: 'email@gmail.com'
    //     });

    //     expect(user.banana(100).toEqual('baana100'));
    //     expect(User.apple().toEqual('apple'));
    // });
    it.only('test compare method', async()=>{
        // const hashedPassword = await hash('123');

        const user = new User({
            email: 'email@gmail.com',
            //passwordHash: hashedPassword
            password:'123'
        });
        return user
            .compare('123')
            .then(result=>{
                expect(result).toBeTruthy();
            });
    });
});

