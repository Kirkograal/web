// Command function is in here
// because the help command wouldn't
// display itself inside command help list

const { RichEmbed } = require('discord.js');
const config  = require('../config/index');

module.exports = (bot, db, guildDoc, msg, cmdParams) => {
	// Check if user is requesting help for specific command
	let name = cmdParams.join(' ').trim();
	if (name) {
		// Check if command exist
		let cmd = bot.commands.get(name);
		if (cmd) {
			let embed = new RichEmbed()
			.setAuthor(`Command '${name}'`, '', config.homePage)
			.setColor('#0096ff')
			.setDescription(cmd.description)
			.addField('Category', cmd.category, false)
			.addField('Type', cmd.type === null ? 'No Pref.' : cmd.type, false);

			// Format parameters
			if (cmd.params.length > 0) {
				let params = '';
				for (let i = 0; i < cmd.params.length; i++) {
					let defaultValue = cmd.params[i].default !== null ? `=${cmd.params[i].default}` : ``;
					if (cmd.params[i].optional)
						params += `[${cmd.params[i].name}${defaultValue}]`;
					else
						params += cmd.params[i].name + defaultValue;

					params += ` - ${cmd.params[i].description}\n`;
				}
				embed.addField('Parameters', params, false);
			}

			msg.channel.send({embed});
		} else {
			msg.reply(`Couldn't find any info for the command \`${name}\``);
		}
	} else {
		let publicCommands  = '';
		let privateCommands = '';
		let commands        = '';

		bot.commands.forEach((cmd, name) => {
			let desc = `\`${name}\` - ${cmd.description}\n`;
			if (cmd.type === 'Public')
				publicCommands += desc;
			else if (cmd.type === 'Private')
				privateCommands += desc;
			else
				commands += desc;
		});

		let embed = new RichEmbed()
		.setAuthor('Commands', '', config.homePage)
		.setColor('#0096ff')
		.addField('No Pref.', commands, false)
		.addField('Public', publicCommands, false)
		.addField('Private', privateCommands, false)
		.setFooter(`TIP: Try "${config.bot.prefix}help (command)" for details of a specific command`);

		msg.channel.send({embed});
	}
};