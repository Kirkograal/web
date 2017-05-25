const ytdl = require('ytdl-core');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		const voiceChannel = msg.member.voiceChannel;

		if (voiceChannel) {
			voiceChannel.join()
			.then(() => {
				console.log('connected');
				msg.reply('connected');
			})
			.catch(err => {
				msg.reply('error');
				console.log('error: ' + err);
			})
		} else {
			msg.reply(`Join a voice channel first`);
		}
	},
	type: 'public',
	category: 'music',
	description: 'Joins a voice channel',
	params: [
		{
			name: 'channel',
			optional: true,
			description: 'Voice channel to join'
		}
	]
};