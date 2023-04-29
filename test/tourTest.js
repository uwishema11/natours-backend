const {assert} = require('chai');
const request = require('supertest');
const app = require('../app');




describe('tour controller', () => {
  describe('GET /api/v1/tours', () => {
    it('should return a 200 status code', async () => {
      const response= await request(app)
      .get('/api/v1/tours');
     assert.equal(response.status, 200);
    });
  });
});
