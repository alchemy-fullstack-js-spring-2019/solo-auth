const request = require('supertest');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('auth route', () => {
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

    it('can sign up', () => {
        return request(app)
            .post('/api/v1/auth/signup')
            .send({
                email:'email@email.com',
                password: '123'
            })
            .then(createdProfile => {
                expect(createdProfile.body).toEqual({
                    user:{
                        email:'email@email.com',
                        _id:expect.any(String)    
                    },  
                    token:expect.any(String)
                });
            });

    });
});
