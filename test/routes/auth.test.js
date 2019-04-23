const request = require('supertest');
const app = require('../../lib/app');

describe('auth route', () => {
    it('can sign up', () => {
        return request(app)
            .post('/api/v1/auth/signup')
            .send({
                email:'email@email.com',
                password: '123'
            })
            .then(createdProfile => {
                expect(createdProfile.body).toEqual({
                    email:'email@email.com',
                    token:expect.any(String)
                });
            });

    });
});
