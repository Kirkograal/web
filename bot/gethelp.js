const { RichEmbed } = require('discord.js');
const { homePage }  = require('../config/index');

module.exports = (bot, db, guildDoc, msg, cmdParams) => {
	let embed = new RichEmbed()
	.setAuthor('Commands', '', homePage)
	.setColor('#0096ff');

	let publicCommands = '';
	let privateCommands = '';
	let commands = '';

	bot.commands.forEach((cmd, name) => {
		let desc = `\`${name}\` - ${cmd.description}\n`;
		if (cmd.type === 'public')
			publicCommands += desc;
		else if (cmd.type === 'private')
			privateCommands += desc;
		else
			commands += desc;
	});

	embed.addField('No Pref.', commands, false);
	embed.addField('Public', publicCommands, false);
	embed.addField('Private', privateCommands, false);

	msg.channel.send({embed: embed})
};