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
});
