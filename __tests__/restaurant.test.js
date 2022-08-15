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

  it('#GET /api/v1/restaurants, displays list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String)
    });
  });

  it('#GET restaurants/:id, one restaurant with nested reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'El Burrito Azteca',
      type: 'Mexican',
      reviews: expect.any(Array)
    });
  });

});
