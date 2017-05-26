
module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;

		if (voiceConnection) {
			if (voiceConnection.dispatcher) {
				if (voiceConnection.dispatcher.speaking) {
					voiceConnection.dispatcher.pause();
					return msg.reply(`Paused music`);
				}
			}
		}

		msg.reply(`Couldn't pause music`);
	},
	type: 'public',
	category: 'music',
	description: 'Pauses the current active song',
	params: []
};