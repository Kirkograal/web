const Discord = require('discord.js');
const config  = require('../config/index');

class Client extends Discord.Client {
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

		///require('./musicQueue')(this);
		this.musicQueue = new Map();
	}

	// Simple login
	login() {
		return super.login(config.bot.token);
	}

	// Add item to guild specific queue
	addToQueue(guildID, item) {
		let queue = this.musicQueue.get(guildID);
		if (queue) {
			queue.push(item);
		} else {
			this.musicQueue.set(guildID, [item]);
		}
	}

	// Remove item from guild queue
	nextInQueue(guildID) {
		let queue = this.musicQueue.get(guildID);
		if (queue) {
			let next = queue[0];
			console.log(`next: ${next}`)
			queue.shift();
			return next;
		}
	}

	// Seach for guild channel
	getGuildChannel(query, guild) {
		if (query.indexOf("<#") === 0) return guild.channels.get(query.substring(2, query.length - 1));
		else return guild.channels.find('name', query);
	}

	// Search for guild member
	getGuildMember(query, guild) {
		if(!isNaN(query)) {
			return guild.members.get(query);
		} else if (query.indexOf("<@") === 0) {
			return guild.members.get(query.substring(2, query.length - 1));
		} else {
			if(query.indexOf("@") === 0)
				query = query.slice(1);
			return guild.members.find(mem => mem.user.username === query);
		}
	}

	// Search for guild role
	getGuildRole(query, guild) {
		if (!isNaN(query)) return guild.roles.get(query);
		else return guild.roles.find('name', query);
	}

	// Search for user
	getUser(query) {
		if(!isNaN(query)) {
			return this.users.get(query);
		} else if (query.indexOf("<@") === 0) {
			return this.users.get(query.substring(2, query.length - 1));
		} else {
			if(query.indexOf("@") === 0)
				query = query.slice(1);
			return this.users.find("username", query);
		}
	}
}

module.exports.Client = Client;