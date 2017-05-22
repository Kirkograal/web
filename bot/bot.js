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
}

// Just removes the need to get token
Bot.prototype.login = () => {
	return super.login(config.bot.token)
};

Bot.prototype.getGuildChannel = (query, guild) => {
	if (query.indexOf("<#") == 0) return guild.channels.get(query.substring(2, query.length - 1));
	else return guild.channels.find('name', query);
};

Bot.prototype.getGuildMember = (query, guild) => {
	if(!isNaN(query)) {
		return guild.members.get(query);
	} else if (query.indexOf("<@") == 0) {
		return guild.members.get(query.substring(2, query.length - 1));
	} else {
		if(query.indexOf("@") == 0)
			query = query.slice(1);
		return guild.members.find(mem => mem.user.username === query);
	}
};

Bot.prototype.getGuildRole = (query, guild) => {
	if (!isNaN(query)) return guild.roles.get(query);
	else return guild.roles.find('name', query);
};

Bot.prototype.getUser = (query, bot) => {
	if(!isNaN(query)) {
		return bot.users.get(query);
	} else if (query.indexOf("<@") == 0) {
		return bot.users.get(query.substring(2, query.length - 1));
	} else {
		if(query.indexOf("@") == 0)
			query = query.slice(1);
		return bot.users.find("username", query);
	}
};

module.exports = Bot;