const Client = require('./discord').Client;

module.exports = (db) => {
	let bot = new Client(db);
	bot.login();
	return bot;
};
