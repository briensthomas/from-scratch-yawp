const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
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

  it('#DELETE should return status 401 for unauthorized users', async () => {
    const res = await request(app).delete('/api/v1/reviews/1');

    expect(res.status).toBe(401);
  });

  it('#DELETE should return status 200 for user with the same user_id', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users/sessions').send(testUser);
    const resDelete = await agent.delete('/api/v1/reviews/1');

    expect(resDelete.status).toBe(204);
  });

  it('#DELETE should return status 200 for admin', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users').send({
      email: 'admin',
      password: '123456'
    });

    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.status).toBe(204);
  });

});
