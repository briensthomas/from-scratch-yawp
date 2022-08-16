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

  it('#GET restaurants/:restId, one restaurant with nested reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'El Burrito Azteca',
      type: 'Mexican',
      reviews: expect.any(Array)
    });
  });

  it('#POST restaurants/:restId/reviews should create a new review', async () => {
    const newReview = {
      content: 'Word is, Kat likes this place!'
    };
    const res = await request(app)
      .post('/api/v1/restaurants/1/reviews')
      .send(newReview);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      content: 'Word is, Kat likes this place!',
      restaurant_id: '1',
      user_id: expect.anything()
    });
  });

});
