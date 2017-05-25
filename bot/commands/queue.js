const unirest = require('unirest');
const { credentials }  = require('../../config/index');
const { RichEmbed } = require('discord.js');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let q = cmdParams.join(' ');
		if (!q) {
			return msg.reply('You must search for something');
		}

		if (!bot.voiceConnections.exists('guild.id', msg.guild.id)) {
			//return msg.reply(`Bot isn't connected to any voice channel. Use \`>>join\` to join a voice channel`);
		}

		unirest.get(`https://www.googleapis.com/youtube/v3/search`)
		.query('part=snippet')
		.query('maxResults=1')
		.query('type=video')
		.query(`q=${encodeURIComponent(q)}`)
		.query(`key=${credentials.google.apiKey}`)
		.header('Accept', 'application/json')
		.end(res => {
			let result = res.body.items[0];

			if (!result) {
				return msg.reply(`No results found for \`${q}\``);
			}

			bot.addToQueue(msg.guild.id, result);

			let embed = new RichEmbed()
			.setTitle(result.snippet.title)
			.setColor('#01f400')
			.setThumbnail(result.snippet.thumbnails.medium.url)
			.setFooter(`Added by ${msg.author.tag} | Queue #${bot.musicQueue.get(msg.guild.id).length}`)
			.setDescription(result.snippet.description);

			msg.channel.send({embed: embed});
		});
	},
	type: 'public',
	category: 'music',
	description: 'Add video to music queue',
	params: [
		{
			name: 'query',
			optional: false,
			description: 'Query term to search for'
		}
	]
};