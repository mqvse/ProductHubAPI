const request = require('supertest');
const app = require('../server');

describe('Product API', () => {
  it('should list products', async () => {
    const res = await request(app.callback()).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
