
const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const expect = chai.expect;

describe('tour controller', () => {
  it('should return the correct contents', async () => {
    const response = await request(app).get('/api/v1/tours');
  }); 
});
