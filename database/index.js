const mongoose = require("mongoose");
const config   = require('../config/index');

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
if (config.inDevelopment) {
	mongoose.connect(config.db.developmentURL);
} else if (config.inProduction) {
	mongoose.connect(config.db.productionURL);
}

module.exports = mongoose.models;