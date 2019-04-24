require('dotenv').config();
require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');


describe('authorize users with tokens', () => {
  it('can Sign Up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'marty.seeks@party.lit',
        password: 'super-secure'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'marty.seeks@party.lit',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
  it('can sign In an existing user', async() => {
    //eslint-disable-next-line no-unused-vars
    const user = await User.create({
      email: 'marty.seeks@party.lit',
      password: 'super-secure'
    });
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marty.seeks@party.lit',
        password: 'super-secure'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'marty.seeks@party.lit',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('throws error when bad signin for existing user', async() => {
    //eslint-disable-next-line no-unused-vars
    const user = await User.create({
      email: 'marty.seeks@party.lit',
      password: 'super-secure'
    });
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marty.seeks@party.lit',
        password: 'not-secure'
      })
      .then(res => {
        expect(res.body).toEqual({
          error: 'Invalid Authentication'
        });
      });
  });

});
