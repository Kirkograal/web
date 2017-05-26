
module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;
		try {
			voiceConnection.dispatcher.pause();
			msg.reply(`Paused music`);
		} catch (err) {}
	},
	type: 'public',
	category: 'music',
	description: 'Pauses the current active song',
	params: []
};