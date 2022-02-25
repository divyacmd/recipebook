const request = require('supertest');
const { Foreigns } = require('../../models/foreigns');
const mongoose = require('mongoose');

let server;

describe('/api/foreigns', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => { 
    await server.close(); 
    await Foreigns.remove({});
  });

  describe('GET /', () => {
    it('should return all foreigns', async () => {
      const foreigns = [
        { name: 'foreign1' },
        { name: 'foreign2' },
      ];
      
      await Foreigns.collection.insertMany(foreigns);

      const res = await request(server).get('/api/foreigns');
      
      expect(res.status).toBe(200);
      expect(res.body.some(g => g.name === 'foreign1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'foreign2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a foreign if valid id is passed', async () => {
      const foreign = new Foreigns({ name: 'foreign1' });
      await foreign.save();

      const res = await request(server).get('/api/foreigns/' + foreign._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', foreign.name);     
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/foreigns/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no foreign with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/foreigns/' + id);

      expect(res.status).toBe(404);
    });
  });
});