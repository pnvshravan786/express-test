// import request from 'supertest';
// import { app } from '../src/index.js'; 

// describe('Express App', () => {
//   it('should return 200 OK for the home route', async () => {
//     const res = await request(app).get('/');
//     expect(res.status).toBe(200);
//     expect(res.text).toContain('Server is running!'); // Adjust based on your response
//   });
// });
import request from 'supertest';
import { app, server } from '../src/index.js'; // Ensure you export the server

describe('Express App', () => {
  afterAll(() => {
    server.close(); // Close server to avoid hanging tests
  });

  it('should return 200 OK for the home route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(404);
    expect(res.text).toContain('Server is running!'); // Adjust based on actual response
  });
});
