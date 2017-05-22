var events = {
	ready: require('./ready'),
	message: require('./message')
};

module.exports = (bot, db) => {
	bot.on('ready', () => {
		events.ready(bot, db);
	});

	bot.on('message', (message) => {
		events.message(bot, db, message);
	})
};