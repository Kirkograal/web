
module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;

		if (voiceConnection) {
			if (voiceConnection.dispatcher) {
				if (voiceConnection.dispatcher.speaking) {
					voiceConnection.dispatcher.pause();
					msg.reply(`Paused music`);
				} else {
					msg.reply(`Music already paused`);
				}
			}
		} else {
			msg.reply(`Couldn't pause music`);
		}
	},
	type: 'Public',
	category: 'Music',
	description: 'Pauses the current active song',
	params: []
};