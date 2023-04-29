const {assert} = require('chai');
const request = require('supertest');
const app = require('../app');



describe('tour controller', () => {
  describe('tours API', () => {
    it('getting all tours', async () => {
      const response= await request(app)
      .get('/api/v1/tours');
     assert.equal(response.status, 200);
    });
    it('should add a tour', async()=>{
      const name='first tour';
      const price=200
      const res =await request(app)
      .post('/api/v1/tours')
      .send({name,price})
      assert.equal(res.status, 401);
    })
  });

});
