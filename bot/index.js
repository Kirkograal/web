var Bot = require('./bot');

module.exports = (db) => {
	var bot = new Bot(db);
	bot.login();
	return bot;
};
