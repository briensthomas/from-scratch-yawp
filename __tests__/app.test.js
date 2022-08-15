const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const newUser = {
  email: 'test@example.com',
  password: '123456'
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('#POST /api/v1/users, creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(newUser);
    const { email } = newUser;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ 
      user: {
        id: expect.any(String),
        email 
      },
      message: 'You\'ve signed in!' });
  });

  it('#POST /api/v1/users/sessions, logs in an existing user', async () => {
    const res = await request(app).post('/api/v1/users/sessions').send(newUser);
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      user: {
        id: expect.any(String),
        email: 'test@example.com'
      },
      message: 'You\'ve signed in!' 
    });
  });

  

});
