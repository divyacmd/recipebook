const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = { 
      _id: new mongoose.Types.ObjectId().toHexString() 
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.RECIPE_API_JWT_PRIVATE_KEY || '12345');
    expect(decoded).toMatchObject(payload);
  });
});