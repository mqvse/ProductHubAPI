const request = require('supertest');
const app = require('../server');

describe('Reviews', () => {
  it('should fail to add review without auth', async () => {
    const res = await request(app.callback())
      .post('/api/reviews')
      .send({ productId: 1, rating: 5, comment: "Nice!" });
    expect(res.status).toBe(401);
  });
});
