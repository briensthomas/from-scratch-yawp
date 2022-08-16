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

  describe('backend-express-template routes', () => {
    let agent = null;
    beforeEach(async () => {
      const user = {
        email: 'test23@example.com',
        password: '123456'
      };
      agent = request.agent(app);
      const res = await agent.post('/api/v1/users').send(user);
      expect(res.status).toBe(200);
    });
      
    it('#POST route should return a status 200', async () => {
      const newReview = {
        stars: '5',
        detail: 'Word is, Kat likes this place!'
      };

      const res = await request(app)
        .post('/api/v1/restaurants/1/reviews')
        .send(newReview);
      expect(res.status).toBe(401);
    });

    it('#POST restaurants/:restId/reviews should create a new review', async () => {
      const newReview = {
        stars: '5',
        detail: 'Word is, Kat likes this place!'
      };
      // console.log('user', user);
      // console.log('res.status', res.status);

      const res = await agent
        .post('/api/v1/restaurants/1/reviews')
        .send(newReview);

      expect(res.body).toEqual({
        stars: 5,
        detail: 'Word is, Kat likes this place!',
      });
    });

  });
});
