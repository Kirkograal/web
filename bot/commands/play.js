const ytdl = require('ytdl-core');
const config = require('../../config/index');

function startPlaying(bot, msg) {
	const item = bot.musicQueue[msg.guild.id].items.shift();

	if (!item) {
		msg.member.voiceChannel.leave();
		return;
	}

	const voiceConnection = msg.guild.voiceConnection;
	const stream = ytdl(`https://www.youtube.com/watch?v=${item.id.videoId}`, { filter: 'audioonly' });
	const dispatcher = voiceConnection.playStream(stream);

	dispatcher.on('end', () => {
		console.log('dispatcher ended');
		startPlaying(bot, msg);
	});

	dispatcher.on('error', (err) => {
		console.log(err);
	});
}

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;

		// I would have so many if statements here so i just used try catch
		try {
			// Play if song is paused or just stop if song is already playing
			if (voiceConnection.dispatcher.stream) {
				if (!voiceConnection.dispatcher.speaking)
					voiceConnection.dispatcher.resume();
				return;
			}
		} catch(e) {}


		// Check if songs are available
		if (!bot.musicQueue.hasOwnProperty(msg.guild.id)) {
			return msg.reply(`There aren't any songs queued. Use the \`add\` command to queue a song.`);
		}

		// Join voice channel if not already
		if (!voiceConnection) {
			bot.commands.get('join').run(bot, db, guildDoc, msg, cmdParams);
		}

		let item = bot.musicQueue[msg.guild.id].items[0];
		msg.channel.send(`Now playing ${item.snippet.title}`);

		startPlaying(bot, msg);
	},
	type: 'public',
	category: 'music',
	description: 'Start to play queued or paused song',
	params: []
};