const config = require('../../config/index');

module.exports = (...[bot, db, msg]) => {
	if (msg.author.bot === true) return;

	// Guild text channel
	if (msg.channel.type === 'text') {
		// guild in db?
		// user in db?
	}

	// Message starts with command prefix
	if (msg.content.startsWith(config.bot.prefix)) {
		let content   = msg.content.substr(config.bot.prefix.length);
		let cmdName   = content.split(' ')[0].toLowerCase();
		let cmdParams = content.substring(cmdName.length + 1).split(' ');
		let command   = bot.commands.get(cmdName);
		if (!command) return;

		// whether in guild or dm channel
		if (msg.channel.type === 'text') {
			if (command.type === 'Private')
				return msg.reply(`You must message me directly to use this command.`);

			// Get guild document from database
			db.guilds.findOne({_id: msg.guild.id}, (err, doc) => {
				if (err) return;
				try {
					command.run(bot, db, doc, msg, cmdParams);
				} catch (err) {
					console.error(err);
					msg.reply(`Error running command. Please contact bot owner for assistance.`);
				}
			});
		} else if (msg.channel.type === 'dm') {
			if (command.type === 'Public')
				return msg.reply(`You must be in a guild channel to use this command.`);

			command.run(bot, db, null, msg, cmdParams);
		}
	}
};