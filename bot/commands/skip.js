module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;

		if (bot.musicQueue.hasOwnProperty(msg.guild.id)) {
			if (bot.musicQueue[msg.guild.id].items.length <= 0)
				return msg.reply(`There aren't any more songs to play`);
		}

		try {
			voiceConnection.dispatcher.end();
		} catch (err) {
			msg.reply(`Can't skip songs right now`);
		}
	},
	type: 'public',
	category: 'music',
	description: 'Skips current song',
	params: []
};