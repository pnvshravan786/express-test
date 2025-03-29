import request from 'supertest';
import { app } from '../src/index.js'; 

describe('Express App', () => {
  it('should return 200 OK for the home route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Welcome to Express'); // Adjust based on your response
  });
});
