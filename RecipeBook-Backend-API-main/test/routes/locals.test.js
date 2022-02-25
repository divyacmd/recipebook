const request = require('supertest');
const { Locals } = require('../../models/locals');
const mongoose = require('mongoose');

let server;

describe('/api/locals', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => { 
    await server.close(); 
    await Locals.remove({});
  });

  describe('GET /', () => {
    it('should return all locals', async () => {
      const locals = [
        { name: 'local1' },
        { name: 'local2' },
      ];
      
      await Locals.collection.insertMany(locals);

      const res = await request(server).get('/api/locals');
      
      expect(res.status).toBe(200);
      expect(res.body.some(g => g.name === 'local1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'local2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a local if valid id is passed', async () => {
      const local = new Locals({ name: 'local1' });
      await local.save();

      const res = await request(server).get('/api/locals/' + local._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', local.name);     
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/locals/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no local with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/locals/' + id);

      expect(res.status).toBe(404);
    });
  });
});