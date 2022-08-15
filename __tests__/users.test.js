const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('#POST /api/v1/users, creates a new user', async () => {
    const newUser = {
      email: 'test23@example.com',
      password: '123456'
    };
    const res = await request(app).post('/api/v1/users').send(newUser);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ 
      user: {
        id: expect.any(String),
        email: 'test23@example.com'
      },
      message: 'You\'ve signed in!' });
  });

  it('#POST /api/v1/users/sessions, logs in an existing user', async () => {
    const user = {
      email: 'test@example.com',
      password: '123456'
    };
    const res = await request(app).post('/api/v1/users/sessions').send(user);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'You\'ve signed in!'
    });
  });

  it('#GET /api/v1/users, protected must be admin to view', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users/').send({
      email: 'admin',
      password: '123456'
    });
    const res = await agent.get('/api/v1/users');

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      created_at: expect.any(String),
      id: expect.any(String),
      email: expect.any(String)
    });
  });



});
