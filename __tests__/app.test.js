const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});

afterAll(() => {
  pool.end();
});

it('#POST /api/v1/users, creates a new user', async () => {
  const newUser = {
    email: 'test@example.com',
    password: '123456'
  };
  const res = await request(app).post('/api/v1/users').send(newUser);

  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    id: expect.any(String),
    ...newUser
  });
})

;
