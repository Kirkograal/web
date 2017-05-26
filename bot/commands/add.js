const unirest = require('unirest');
const { credentials }  = require('../../config/index');
const { RichEmbed } = require('discord.js');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let q = cmdParams.join(' ');
		if (!q) {
			return msg.reply('You must search for something');
		}

		// Check if its a link
		if (q.include)

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

			if (!bot.musicQueue.hasOwnProperty(msg.guild.id)) {
				bot.musicQueue[msg.guild.id] = {};
				bot.musicQueue[msg.guild.id].items = [];
			}
			bot.musicQueue[msg.guild.id].items.push(result);

			let embed = new RichEmbed()
			.setTitle(result.snippet.title)
			.setColor('#01f400')
			.setThumbnail(result.snippet.thumbnails.medium.url)
			.setFooter(`Added by ${msg.author.tag} | Queue #${bot.musicQueue[msg.guild.id].items.length}`)
			.setDescription(result.snippet.description);

			msg.channel.send({embed: embed});
			bot.commands.get('play').run(bot, db, guildDoc, msg, cmdParams);
		});
	},
	type: 'public',
	category: 'music',
	description: 'Add video to music queue',
	params: [
		{
			name: 'query',
			optional: false,
			description: 'Query term to search for or the youtube video link'
		}
	]
};