require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const User = require('../lib/models/User');

describe('auth routes', () => {
    beforeAll(() => {
        return connect();
    });

    beforeEach(() => {
        mongoose.connection.dropDatabase();
    });
    
    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can sign up a new user', () => {
        return request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'pw1234'
            })
            .then(res => {
                expect(res.body).toEqual({
                    email: 'test@test.com',
                    _id: expect.any(String),
                    token: expect.any(String)
                });
            });
    });

    it('can sign in a user', () => {
        return User.create({
            email: 'test@test.com',
            password: 'pw123'
        })
            .then(() => {
                request(app)
                    .post('/api/v1/auth/signin')
                    .send({
                        email: 'test@test.com',
                        password: 'pw123'
                    });
            })
            .then(res => {
                expect(res.body).toEqual({
                    user: {
                        _id: expect.any(String),
                        email: 'test@test.com'
                    },
                    token: expect.any(String)
                });
            });
    });
});
