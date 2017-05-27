const mongoose = require("mongoose");
const { db }   = require('../config/index');

// Couldn't connect
mongoose.connection.on('error', err => {
	console.error(err);
});

// Connected successful
mongoose.connection.once('open', err => {
	if (err) {
		console.error(err);
	} else {
		mongoose.model('guilds', require('./schemas/guilds'));
		mongoose.model('users', require('./schemas/users'));

		console.log('Database is ready!');
	}
});

// Establish connection
mongoose.connect(db.url);

module.exports = mongoose.models;
