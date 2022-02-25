const express = require('express');
const error = require('../middleware/error');

const users = require('../routes/users');
const auth = require('../routes/auth');
const locals = require('../routes/locals');
const foreigns = require('../routes/foreigns');


module.exports = function(app) {
	app.use(express.json());
	app.use('/api/users', users);
 	app.use('/api/auth', auth);
	app.use('/api/locals', locals);
	app.use('/api/foreigns', foreigns);
	app.use(error);
}