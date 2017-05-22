var config = require('../../config/index');

module.exports = (bot, db, msg) => {
	if (msg.author.bot === true) return;

	// Guild text channel
	if (msg.channel.type == 'text') {
		// guild in db?
		// user in db?
	}

	if (msg.content.startsWith(config.bot.prefix)) {
		let content   = msg.content.substr(2);
		let cmdName   = content.split(' ')[0].toLowerCase();
		let cmdParams = content.substring(cmdName.length + 1).split(' ');
		let command   = bot.commands.get(cmdName);
		if (!command) return;

		if (msg.channel.type == 'text') {
			command.run(bot, db, result, msg, cmdParams);
		} else if (msg.channel.type == 'dm') {

		}
	}
};