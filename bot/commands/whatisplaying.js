const { RichEmbed } = require('discord.js');
const truncate = require('truncate');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;
		if (!voiceConnection || !bot.musicQueue.hasOwnProperty(msg.guild.id)) {
			return msg.reply(`Nothing is playing`);
		}

		let item = bot.musicQueue[msg.guild.id].playing;
		if (item) {
			let embed = new RichEmbed()
			.setTitle(`${item.snippet.channelTitle} - ${item.snippet.title}`)
			.setDescription(truncate(item.snippet.description, 200))
			.setColor('#0096ff')
			.setThumbnail(item.snippet.thumbnails.high.url)
			.setTimestamp(item.snippet.publishedAt)
			.setURL(`https://www.youtube.com/watch?v=${item.id.videoId || item.id}`);

			msg.channel.send({embed: embed});
		} else {
			return msg.reply(`Nothing is playing`);
		}
	},
	type: 'public',
	category: 'music',
	description: 'Checks what is currently playing',
	params: []
};