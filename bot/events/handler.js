function loadEvent(event, ...args) {
	try {
		require(`./${event}`)(...args);
	} catch(ex) {
		console.log(ex);
	}
}

module.exports = (bot, db) => {
	bot.on('ready', () => {
		loadEvent('ready', bot, db);
	});

	bot.on('message', (msg) => {
		loadEvent('message', bot, db, msg);
	})
};
