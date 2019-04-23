require('dotenv').config();
const mongoose = require('mongoose'),
  request = require('supertest'),
  app = require('../lib/app'),
  connect = require('../lib/utils/connect');

describe('auth routes', () => {
  beforeAll(() => {
    return connect();
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'icecreamlov3@hotmail.com',
        password: 'i<3IceCream!',
        color: 'red'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'icecreamlov3@hotmail.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('signs in an existing user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'icecreamlov3@hotmail.com',
        password: 'i<3IceCream!',
        color: 'red'
      })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'icecreamlov3@hotmail.com',
            password: 'i<3IceCream!',
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'icecreamlov3@hotmail.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('errors on bad password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'icecreamlov3@hotmail.com',
        password: 'i<3IceCream!',
        color: 'red'
      })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'icecreamlov3@hotmail.com',
            password: 'wrongpassword',
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          error: 'Authentication Error'
        });
      });
  });

  it('errors on non-existing user sign in', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'icecreamlov3@hotmail.com',
        password: 'i<3IceCream!',
      })
      .then(res => {
        expect(res.body).toEqual({
          error: 'Authentication Error'
        });
      });
  });

  it('verifies a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'icecreamlov3@hotmail.com',
        password: 'i<3IceCream!',
      })
      .then(res => {
        return request(app)
          .get('/api/v1/auth/verify')
          .set('Authorization', `Bearer ${res.body.token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'icecreamlov3@hotmail.com'
        });
      });
  });
});
