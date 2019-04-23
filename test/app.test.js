const mongoose = require('mongoose'),
  request = require('supertest'),
  app = require('../lib/app'),
  connect = require('../lib/utils/connect');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  afterEach(() => {
    mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    mongoose.connection.close();
  });
  
  it('signs up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({

      })
      .then(res => {
        expect(res.body).toEqual('poop');
      });
  });
});
