const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const agent = request.agent(app);

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('#DELETE should return status 401 for unauthorized users', async () => {
    const res = await request(app).delete('/api/reviews/1');

    expect(res.status).toBe(401);
  });

  it('#DELETE should return status 200 for admin', async () => {
    await agent.post('/api/v1/users/').send({
      email: 'admin',
      password: '123456'
    });

    const res = await agent.delete('/api/reviews/1');

    expect(res.status).toBe(200);
  });

  
});
