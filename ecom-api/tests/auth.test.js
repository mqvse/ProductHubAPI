const request = require('supertest');
const app = require('../../ecom-api/server');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app.callback())
      .post('/api/auth/register')
      .send({ email: `test${Date.now()}@example.com`, password: "pass123", username: "tester" });
    expect(res.status).toBe(200);
    expect(res.body.email).toBeTruthy();
  });
});
