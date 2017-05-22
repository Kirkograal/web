var discord = require('discord.js');
var config  = require('../config/index');

class Bot extends discord.Client {
	constructor(database) {
		super({
			disabledEvents: [
				'GUILD_ROLE_CREATE',
				'GUILD_ROLE_DELETE',
				'GUILD_ROLE_UPDATE',
				'CHANNEL_DELETE',
				'USER_NOTE_UPDATE',
				'TYPING_START',
				'VOICE_STATE_UPDATE'
			],
		});

		// Events
		require('./events/handler')(this, database);

		// Message commands
		require('./commands/handler')(this);
	}

	// Just a simpler login
	login() {
		return super.login(config.bot.token);
	}
}

module.exports = Bot;